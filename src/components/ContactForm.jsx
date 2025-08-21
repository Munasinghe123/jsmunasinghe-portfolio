import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as Z from "zod";
import emailjs from "@emailjs/browser";
import { useState } from "react";

const contactFormSchema = Z.object({
  name: Z.string().nonempty("Name is required"),
  email: Z.string().email("Invalid email").nonempty("Email is required"),
  subject: Z.string().nonempty("Subject is required"),
  message: Z.string().nonempty("Message is required"),
});

const initialValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: initialValues,
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const payload = {
        title: data.subject,
        name: data.name,
        email: data.email,
        message: data.message,
        time: new Date().toLocaleDateString()
      };

      const serviceID = import.meta.env.VITE_SERVICE_ID;
      const userID = import.meta.env.VITE_PUBLIC_KEY;
      const templateID = import.meta.env.VITE_TEMPLATE_ID;

      console.log(serviceID);

      console.log(userID);

      const res= await emailjs.send(serviceID, templateID, payload, {
        publicKey: userID,
      });

      if (res?.status === 200) {
        alert("Email sent successfully");
        reset(initialValues);
      } else {
        throw new Error(`EmailJS responded with ${res?.status} ${res?.text}`);
      }

    } catch (error) {
      console.log("FAILED...", error);
      alert("Failed to send message, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl">

      <div className="gradient-border gradient-border--brand rounded-2xl p-[2px]">

        <div className="rounded-[22px] bg-black-300/60 p-6 md:p-8">


          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full text-[#a7a7a7] flex flex-col gap-7"
          >
            <div>
              <label
                className="label"
                htmlFor="name"
              >
                Name
              </label>
              <input
                {...register("name")}
                type="text"
                id="name"
                placeholder="Tommy"
                className="input"
              />
              {errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
              )}
            </div>

            <div>
              <label
                className="label"
                htmlFor="email"
              >
                Email address
              </label>
              <input
                type="email"
                {...register("email")}
                id="email"
                placeholder="hello@gmail.com"
                className="input"
              />
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
            </div>

            <div>
              <label
                className="label"
                htmlFor="subject"
              >
                Subject
              </label>
              <input
                {...register("subject")}
                type="text"
                id="subject"
                placeholder="Enter your subject"
                className="input"
              />
              {errors.subject && (
                <span className="text-red-500">{errors.subject.message}</span>
              )}
            </div>

            <div>
              <label
                className="label"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                id="message"
                {...register("message")}
                placeholder="Enter your message"
                rows="5"
                className="input"
              ></textarea>
              {errors.message && (
                <span className="text-red-500">{errors.message.message}</span>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-blue-50 text-white-50 font-semibold rounded-md hover:bg-blue-600 transition duration-300"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
