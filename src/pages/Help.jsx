import React from "react";
import { FiHelpCircle } from "react-icons/fi";
import faqAnimation from '../assets/lotties/faq-animation.json'
import Lottie from "lottie-react";

const Help = () => {
  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <div className="text-center mb-8">
        <FiHelpCircle className="text-6xl text-blue-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold">How Can We Help You?</h1>
        <p className="text-gray-600 mt-2">
          Find answers to common questions or get in touch with our support team.
        </p>
      </div>

      {/* Help Section */}
      <div className="bg-blue-50 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Need Assistance?</h2>
        <p className="text-gray-700">
          If you are having trouble using our platform or have specific questions about your account,
          our support team is here to assist you. Please check the FAQ section below or contact us via
          email at <span className="text-blue-600 font-medium">support@tagtalks.com</span>.
        </p>
      </div>

      {/* FAQ Section */}
      <section className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center gap-10">
        <div className="w-2/4">
          <Lottie animationData={faqAnimation}></Lottie>
        </div>
        <div className="md:px-14">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="collapse collapse-arrow border border-gray-200 rounded-box">
              <input type="checkbox" />
              <div className="collapse-title text-lg font-medium">
                What is TagTalks and how does it work?
              </div>
              <div className="collapse-content">
                <p>
                  TagTalks is a platform for connecting people, sharing ideas, and exploring innovative topics.
                  You can participate in discussions, share your insights, and grow your network.
                </p>
              </div>
            </div>

            <div className="collapse collapse-arrow border border-gray-200 rounded-box">
              <input type="checkbox" />
              <div className="collapse-title text-lg font-medium">
                How can I create an account on TagTalks?
              </div>
              <div className="collapse-content">
                <p>
                  To create an account, click on the "Sign Up" button on the homepage, fill in the required
                  details, and confirm your email address.
                </p>
              </div>
            </div>

            <div className="collapse collapse-arrow border border-gray-200 rounded-box">
              <input type="checkbox" />
              <div className="collapse-title text-lg font-medium">
                Is TagTalks free to use?
              </div>
              <div className="collapse-content">
                <p>
                  Yes, TagTalks is free to use. However, we also offer premium features for users who want
                  to enhance their experience on the platform.
                </p>
              </div>
            </div>

            <div className="collapse collapse-arrow border border-gray-200 rounded-box">
              <input type="checkbox" />
              <div className="collapse-title text-lg font-medium">
                How do I contact customer support?
              </div>
              <div className="collapse-content">
                <p>
                  You can contact our customer support team by sending an email to
                  <span className="text-blue-600 font-medium"> support@tagtalks.com</span>.
                  We are available 24/7 to assist you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Help;
