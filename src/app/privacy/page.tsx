import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | PeerFolio",
  description: "PeerFolio Privacy Policy - How we collect, use, and protect your data",
};

export default function PrivacyPage() {
  return (
    <div className="container max-w-4xl py-10">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <div className="prose max-w-none">
        <p className="text-sm text-gray-500 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">1. Introduction</h2>
        <p>
          PeerFolio ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, mobile application, or any other services we offer (collectively, the "Services").
        </p>
        <p>
          We designed this Privacy Policy to comply with various international data protection laws and regulations, including but not limited to the General Data Protection Regulation (GDPR), the California Consumer Privacy Act (CCPA), and other applicable privacy laws.
        </p>
        <p>
          Please read this Privacy Policy carefully. By using our Services, you consent to the practices described in this policy.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">2. Information We Collect</h2>
        <p>
          <strong>2.1 Information You Provide:</strong> We collect information you provide directly to us, including:
        </p>
        <ul className="list-disc pl-8 my-4">
          <li>Account information (name, email address, password, etc.)</li>
          <li>Profile information (professional background, job title, etc.)</li>
          <li>Content you post (reviews, comments, etc.)</li>
          <li>Communications with us</li>
          <li>Information about others that you provide when writing reviews</li>
        </ul>
        <p>
          <strong>2.2 Information We Collect Automatically:</strong> When you use our Services, we may automatically collect:
        </p>
        <ul className="list-disc pl-8 my-4">
          <li>Device information (IP address, browser type, operating system, etc.)</li>
          <li>Usage information (pages visited, time spent, etc.)</li>
          <li>Location information (general location based on IP address)</li>
          <li>Cookies and similar technologies</li>
        </ul>
        <p>
          <strong>2.3 Information from Third Parties:</strong> We may receive information about you from third parties, such as:
        </p>
        <ul className="list-disc pl-8 my-4">
          <li>Authentication providers if you sign in using third-party services</li>
          <li>Partners with whom we offer co-branded services or marketing promotions</li>
          <li>Publicly available sources</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">3. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul className="list-disc pl-8 my-4">
          <li>Provide, maintain, and improve our Services</li>
          <li>Process transactions and send related information</li>
          <li>Send you technical notices, updates, security alerts, and support messages</li>
          <li>Respond to your comments, questions, and requests</li>
          <li>Communicate with you about products, services, offers, and events</li>
          <li>Monitor and analyze trends, usage, and activities in connection with our Services</li>
          <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
          <li>Comply with legal obligations</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">4. How We Share Your Information</h2>
        <p>We may share your information in the following circumstances:</p>
        <ul className="list-disc pl-8 my-4">
          <li><strong>With Other Users:</strong> Information you post (such as reviews) will be visible to other users of our Services.</li>
          <li><strong>With Service Providers:</strong> We may share your information with vendors, consultants, and other service providers who need access to such information to carry out work on our behalf.</li>
          <li><strong>For Legal Reasons:</strong> We may disclose your information if we believe it is necessary to comply with a legal obligation, protect our rights and property, or protect the safety of our users or others.</li>
          <li><strong>In Connection with a Business Transfer:</strong> We may share your information in connection with a merger, acquisition, reorganization, or sale of all or a portion of our assets.</li>
          <li><strong>With Your Consent:</strong> We may share your information when you give us permission to do so.</li>
        </ul>
        <p>
          We do not sell your personal information to third parties, as "sell" is traditionally understood. However, some data privacy laws define "sell" broadly. If your information is subject to such laws, we only share your information as described in this Privacy Policy.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">5. Content Removal and Data Subject Rights</h2>
        <p>
          <strong>5.1 Content About You:</strong> If you believe that content posted on our platform about you is inaccurate, defamatory, or violates your rights or our policies, you can:
        </p>
        <ul className="list-disc pl-8 my-4">
          <li>Use our reporting feature to flag the content for review</li>
          <li>Contact us directly at nullcodeai@gmail.com with specific details about the content and your concerns</li>
        </ul>
        <p>
          We will review your request and may take actions such as hiding the content temporarily while investigating, removing content that violates our policies, or adding a note about contested content.
        </p>
        <p>
          <strong>5.2 Your Data Protection Rights:</strong> Depending on your location, you may have certain rights regarding your personal data, including:
        </p>
        <ul className="list-disc pl-8 my-4">
          <li><strong>Access:</strong> The right to request copies of your personal data</li>
          <li><strong>Rectification:</strong> The right to request that we correct inaccurate information about you</li>
          <li><strong>Erasure:</strong> The right to request that we delete your personal data in certain circumstances</li>
          <li><strong>Restriction:</strong> The right to request that we restrict processing of your personal data</li>
          <li><strong>Data Portability:</strong> The right to request that we transfer your personal data to another organization or to you</li>
          <li><strong>Objection:</strong> The right to object to processing of your personal data</li>
          <li><strong>Withdraw Consent:</strong> The right to withdraw consent where we rely on consent to process your personal data</li>
        </ul>
        <p>
          To exercise these rights, please contact us at nullcodeai@gmail.com. Please note that these rights may be limited in some circumstances by local law requirements.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">6. International Data Transfers</h2>
        <p>
          PeerFolio is based in India and the information we collect is governed by Indian laws. If you access our Services from outside India, you acknowledge that your information will be transferred to, stored, and processed in India.
        </p>
        <p>
          If we transfer your personal data from the European Economic Area (EEA), United Kingdom, or Switzerland to countries that have not been deemed to provide an adequate level of data protection, we use appropriate safeguards, such as Standard Contractual Clauses approved by the relevant authorities, to protect your personal data.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">7. Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your personal data against unauthorized or unlawful processing, accidental loss, destruction, or damage. However, no method of transmission over the Internet or electronic storage is 100% secure. Therefore, while we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">8. Data Retention</h2>
        <p>
          We retain your personal data for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When determining the appropriate retention period, we consider the amount, nature, and sensitivity of the personal data, the potential risk of harm from unauthorized use or disclosure, and applicable legal requirements.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">9. Children's Privacy</h2>
        <p>
          Our Services are not intended for children under the age of 16, and we do not knowingly collect personal data from children under 16. If we learn that we have collected the personal data of a child under 16, we will take steps to delete the information as soon as possible.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">10. Changes to this Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on our website and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">11. Cookies and Similar Technologies</h2>
        <p>
          We use cookies and similar tracking technologies to track activity on our Services and hold certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Services.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">12. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at:
        </p>
        <p>
          Email: nullcodeai@gmail.com
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">13. Region-Specific Provisions</h2>
        <h3 className="text-lg font-medium mt-6 mb-3">European Economic Area, United Kingdom, and Switzerland</h3>
        <p>
          If you are located in the EEA, UK, or Switzerland, the following additional information applies:
        </p>
        <ul className="list-disc pl-8 my-4">
          <li><strong>Data Controller:</strong> PeerFolio is the data controller of your personal data.</li>
          <li><strong>Legal Basis for Processing:</strong> We process your personal data on the following legal bases:
            <ul className="list-disc pl-8 my-2">
              <li>Performance of a contract when we provide you with our Services</li>
              <li>Legitimate interests, which include providing and improving our Services</li>
              <li>Compliance with legal obligations</li>
              <li>Your consent, where applicable</li>
            </ul>
          </li>
          <li><strong>Supervisory Authority:</strong> You have the right to lodge a complaint with your local data protection authority.</li>
        </ul>
        
        <h3 className="text-lg font-medium mt-6 mb-3">California Residents</h3>
        <p>
          If you are a California resident, the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA) provide you with specific rights regarding your personal information:
        </p>
        <ul className="list-disc pl-8 my-4">
          <li><strong>Information Disclosure:</strong> You have the right to know what personal information we collect, use, disclose, and sell about you.</li>
          <li><strong>Deletion:</strong> You have the right to request deletion of personal information that we collect and maintain about you, subject to certain exceptions.</li>
          <li><strong>Opt-Out of Sale:</strong> Although we do not sell personal information in the traditional sense, you have the right to opt-out of the sale of your personal information if it occurs under CCPA's broad definition.</li>
          <li><strong>Non-Discrimination:</strong> We will not discriminate against you for exercising any of your CCPA rights.</li>
        </ul>
        <p>
          To exercise these rights, please contact us as described in the "Contact Us" section.
        </p>
      </div>
    </div>
  );
} 