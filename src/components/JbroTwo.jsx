import React, { useEffect, useRef } from 'react'
import { useGraph, useFrame } from '@react-three/fiber'
import { useAnimations, useFBX, useGLTF } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'
import * as THREE from 'three'

export function Model(props) {
  const group = useRef()
  const { scene } = useGLTF('/models/jbro-transformed.glb')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)
 
  const { animations } = useFBX("/models/Waving.fbx")
  animations[0].name = "Dance"
  const { actions, mixer } = useAnimations(animations, group)

  const mouse = useRef(new THREE.Vector2(0, 0))
  const headBone = useRef()
  
  // Find and setup head bone
  useEffect(() => {
    if (group.current) {
      const findHeadBone = () => {
        // Try common head bone names for ReadyPlayerMe/Mixamo models
        const possibleNames = [
          'mixamorigHead', 
          'Head', 
          'head', 
          'mixamorigNeck',
          'Neck',
          'neck'
        ]
        
        for (const name of possibleNames) {
          const bone = group.current.getObjectByName(name)
          if (bone && bone.isBone) {
            console.log(`Found head bone: ${name}`)
            return bone
          }
        }
        
        // Search through all bones if not found by name
        let foundBone = null
        group.current.traverse((child) => {
          if (child.isBone && (
            child.name.toLowerCase().includes('head') || 
            child.name.toLowerCase().includes('neck')
          )) {
            foundBone = child
            console.log(`Found head bone via search: ${child.name}`)
          }
        })
        
        return foundBone
      }

      headBone.current = findHeadBone()
      
      if (!headBone.current) {
        console.log('No head bone found. Available bones:')
        group.current.traverse((child) => {
          if (child.isBone) {
            console.log(`- ${child.name}`)
          }
        })
      }
    }
  }, [nodes])

  // Setup animation with head bone exclusion
  useEffect(() => {
    if (actions["Dance"]) {
      const action = actions["Dance"]
      
      if (headBone.current) {
        // Get the animation clip
        const clip = action.getClip()
        
        // Create a new clip without ONLY head/neck rotation tracks
        const tracks = clip.tracks.filter(track => {
          const boneName = track.name.split('.')[0]
          const isRotationTrack = track.name.includes('quaternion')
          const isHeadOrNeck = boneName.toLowerCase().includes('head') || 
                               boneName.toLowerCase().includes('neck') ||
                               boneName === 'mixamorigHead' ||
                               boneName === 'mixamorigNeck'
          
          // Keep all tracks EXCEPT head/neck rotations
          return !(isHeadOrNeck && isRotationTrack)
        })
        
        console.log(`Original tracks: ${clip.tracks.length}, Filtered tracks: ${tracks.length}`)
        
        // Only create new clip if we actually filtered some tracks
        if (tracks.length < clip.tracks.length) {
          const newClip = new THREE.AnimationClip(clip.name + '_NoHead', clip.duration, tracks)
          mixer.uncacheClip(clip)
          const newAction = mixer.clipAction(newClip)
          newAction.play()
          console.log('Playing animation without head rotation tracks')
        } else {
          // No head tracks found, play original
          action.play()
          console.log('No head tracks filtered, playing original animation')
        }
      } else {
        // No head bone found, play original animation
        action.play()
        console.log('Playing original animation (no head bone found)')
      }
    }
  }, [actions, mixer, headBone.current])

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (event) => {
      const { innerWidth, innerHeight } = window
      
      mouse.current.x = (event.clientX / innerWidth) * 2 - 1
      mouse.current.y = -(event.clientY / innerHeight) * 2 + 1
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Head tracking animation loop
  useFrame((state, delta) => {
    if (headBone.current) {
      // Calculate target rotation based on mouse position
      const targetY = mouse.current.x * 0.6 // Horizontal rotation
      const targetX = -mouse.current.y * 0.4 // Vertical rotation (inverted)
      
      // Smooth interpolation to target rotation
      headBone.current.rotation.x = THREE.MathUtils.lerp(
        headBone.current.rotation.x,
        targetX,
        delta * 5
      )
      headBone.current.rotation.y = THREE.MathUtils.lerp(
        headBone.current.rotation.y,
        targetY,
        delta * 5
      )
      
      // Clamp to realistic head movement ranges
      headBone.current.rotation.x = THREE.MathUtils.clamp(headBone.current.rotation.x, -0.5, 0.3)
      headBone.current.rotation.y = THREE.MathUtils.clamp(headBone.current.rotation.y, -0.8, 0.8)
    }
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={nodes.Hips} />
      <skinnedMesh 
        geometry={nodes.Wolf3D_Body.geometry} 
        material={materials.Wolf3D_Body} 
        skeleton={nodes.Wolf3D_Body.skeleton} 
      />
      <skinnedMesh 
        geometry={nodes.Wolf3D_Outfit_Bottom.geometry} 
        material={materials.Wolf3D_Outfit_Bottom} 
        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton} 
      />
      <skinnedMesh 
        geometry={nodes.Wolf3D_Outfit_Footwear.geometry} 
        material={materials.Wolf3D_Outfit_Footwear} 
        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton} 
      />
      <skinnedMesh 
        geometry={nodes.Wolf3D_Outfit_Top.geometry} 
        material={materials.Wolf3D_Outfit_Top} 
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton} 
      />
      <skinnedMesh 
        name="EyeLeft" 
        geometry={nodes.EyeLeft.geometry} 
        material={materials.Wolf3D_Eye} 
        skeleton={nodes.EyeLeft.skeleton} 
        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary} 
        morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences} 
      />
      <skinnedMesh 
        name="EyeRight" 
        geometry={nodes.EyeRight.geometry} 
        material={materials.Wolf3D_Eye} 
        skeleton={nodes.EyeRight.skeleton} 
        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary} 
        morphTargetInfluences={nodes.EyeRight.morphTargetInfluences} 
      />
      <skinnedMesh 
        name="Wolf3D_Head" 
        geometry={nodes.Wolf3D_Head.geometry} 
        material={materials.Wolf3D_Skin} 
        skeleton={nodes.Wolf3D_Head.skeleton} 
        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary} 
        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences} 
      />
      <skinnedMesh 
        name="Wolf3D_Teeth" 
        geometry={nodes.Wolf3D_Teeth.geometry} 
        material={materials.Wolf3D_Teeth} 
        skeleton={nodes.Wolf3D_Teeth.skeleton} 
        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary} 
        morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences} 
      />
      <skinnedMesh 
        name="Wolf3D_Beard" 
        geometry={nodes.Wolf3D_Beard.geometry} 
        material={materials.Wolf3D_Beard} 
        skeleton={nodes.Wolf3D_Beard.skeleton} 
        morphTargetDictionary={nodes.Wolf3D_Beard.morphTargetDictionary} 
        morphTargetInfluences={nodes.Wolf3D_Beard.morphTargetInfluences} 
      />
    </group>
  )
}

useGLTF.preload('/models/jbro-transformed.glb')