import { FaShieldAlt, FaUsers, FaBullhorn, FaLock, FaFileAlt, FaExclamationTriangle, FaRegCheckCircle } from "react-icons/fa";

const CommunityGuidelines = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">📜 Community Guidelines</h1>
      <p className="text-gray-600 text-center mb-8">
        Welcome to <span className="font-bold"><span className="text-yellow-500">Tags<span className="text-green-500">Talks</span></span></span> To keep this platform respectful and engaging, follow these guidelines.
      </p>

      {/* Guidelines List */}
      <div className="space-y-6">
        <GuidelineItem 
          icon={<FaUsers className="text-blue-500 text-xl" />}
          title="Be Respectful & Kind"
          description="Treat everyone with respect. No harassment, hate speech, or personal attacks. Encourage constructive discussions."
        />
        
        <GuidelineItem 
          icon={<FaBullhorn className="text-green-500 text-xl" />}
          title="No Spam or Self-Promotion"
          description="Avoid excessive promotions, ads, or referral links. Share valuable content that benefits the community."
        />

        <GuidelineItem 
          icon={<FaFileAlt className="text-purple-500 text-xl" />}
          title="Stay on Topic"
          description="Keep discussions relevant to announcements and categories. Avoid derailing conversations."
        />

        <GuidelineItem 
          icon={<FaLock className="text-red-500 text-xl" />}
          title="Protect Privacy & Confidentiality"
          description="Do not share personal details like phone numbers or addresses. Respect privacy and confidentiality."
        />

        <GuidelineItem 
          icon={<FaShieldAlt className="text-yellow-500 text-xl" />}
          title="No Fake News or Misinformation"
          description="Always fact-check before posting. Cite credible sources for news and updates."
        />

        <GuidelineItem 
          icon={<FaExclamationTriangle className="text-orange-500 text-xl" />}
          title="Report & Flag Inappropriate Content"
          description="If you see rule violations, report them to moderators instead of engaging in arguments."
        />

        <GuidelineItem 
          icon={<FaRegCheckCircle className="text-teal-500 text-xl" />}
          title="Follow Admin & Moderator Instructions"
          description="Respect admin decisions. If you have concerns, contact moderators privately."
        />
      </div>

      {/* Final Message */}
      <div className="mt-8 text-center">
        <p className="text-gray-700">
          ⚠️ <span className="font-semibold">Violations may lead to warnings, temporary bans, or account removal.</span>
        </p>
        <p className="text-lg font-semibold mt-2">Let's keep TagTalks a safe and valuable space for all! 🚀</p>
      </div>
    </div>
  );
};

// Reusable Component for Each Guideline
const GuidelineItem = ({ icon, title, description }) => {
  return (
    <div className="flex items-start space-x-4 bg-white p-4 rounded-lg shadow-md">
      <div className="mt-1">{icon}</div>
      <div>
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default CommunityGuidelines;
