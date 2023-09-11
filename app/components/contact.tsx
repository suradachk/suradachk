import { Fade } from "react-awesome-reveal";
import { useState } from "react";
import axios from "axios";

interface Prop {
  mode: boolean;
}

interface IForm {
  email: string;
  subject: string;
  message: string;
}
export const Contact: React.FC<Prop> = ({ mode }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<IForm>({
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = formData;
    try {
      setLoading(true);

      const response = await axios.post("/api/sendmail", data);

      if (response.status === 200) {
        console.log("Email sent successfully!");
      } else {
        console.log("Error sending email.");
      }
    } catch (error) {
      console.error(error);
      console.log("Error sending email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fade cascade damping={0.1}>
      <div>
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-2xl tracking-tight font-extrabold text-center">
            📧 Contact
          </h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium "
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block mb-2 text-sm font-medium "
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                required
                onChange={handleChange}
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium  dark:text-gray-400"
              >
                Your message
              </label>
              <textarea
                id="message"
                name="message"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                rows={6}
                onChange={handleChange}
              />
            </div>
            <button
              className={`py-3 px-5 text-sm font-medium text-center rounded-lg ${
                mode ? "bg-[#374151]" : "bg-[#3F83F8] text-white"
              } ${mode ? "hover:bg-[#6B7280]" : "hover:bg-[#76A9FA]"}`}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </Fade>
  );
};
