import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | PeerFolio",
  description: "PeerFolio Terms of Service and User Agreement",
};

export default function TermsPage() {
  return (
    <div className="container max-w-4xl py-10">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <div className="prose max-w-none">
        <p className="text-sm text-gray-500 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">1. Introduction</h2>
        <p>
          Welcome to PeerFolio ("we," "our," or "us"). By accessing or using our website, mobile application, or any other services we offer (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms"). Please read these Terms carefully. If you do not agree with these Terms, you should not access or use our Services.
        </p>
        <p>
          PeerFolio provides a platform for users to share professional feedback and reviews about individuals they have worked with. These Terms govern your access to and use of our platform.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">2. User Accounts and Responsibilities</h2>
        <p>
          <strong>2.1 Account Creation:</strong> To use certain features of our Services, you may need to create an account. You are responsible for providing accurate information during the registration process and keeping your account credentials secure.
        </p>
        <p>
          <strong>2.2 User Conduct:</strong> You agree not to use our Services to:
        </p>
        <ul className="list-disc pl-8 my-4">
          <li>Post false, misleading, defamatory, or malicious content about others</li>
          <li>Impersonate any person or entity</li>
          <li>Harass, abuse, or harm another person</li>
          <li>Share content that is illegal, obscene, or offensive</li>
          <li>Engage in any activity that could damage, disable, or impair the functioning of our Services</li>
          <li>Attempt to gain unauthorized access to our systems or other users' accounts</li>
          <li>Use our Services for any illegal purpose</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">3. Content Guidelines and Policies</h2>
        <p>
          <strong>3.1 User Content:</strong> By posting content on PeerFolio, you represent and warrant that:
        </p>
        <ul className="list-disc pl-8 my-4">
          <li>You have had a genuine professional interaction with the individual you are reviewing</li>
          <li>Your review is based on your actual experience and honest opinion</li>
          <li>Your content does not violate any applicable law or infringe on any third party's rights</li>
          <li>You have obtained all necessary consents or permissions to share any information contained in your review</li>
        </ul>
        <p>
          <strong>3.2 Content Ownership:</strong> You retain ownership of the content you post on our platform. However, by submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, and distribute your content in connection with our Services.
        </p>
        <p>
          <strong>3.3 Content Moderation:</strong> We reserve the right, but do not have the obligation, to monitor, edit, or remove any content that violates these Terms or that we find objectionable for any reason. We may also suspend or terminate accounts that repeatedly violate our policies.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">4. Dispute Resolution and Objection Process</h2>
        <p>
          <strong>4.1 Reporting Objectionable Content:</strong> If you believe that content posted on our platform is false, defamatory, or otherwise violates these Terms or applicable law, please use our reporting feature to notify us. We have established a review process to address such reports.
        </p>
        <p>
          <strong>4.2 Content Review Process:</strong> Upon receiving a report, we may:
        </p>
        <ul className="list-disc pl-8 my-4">
          <li>Temporarily hide the content while we investigate</li>
          <li>Request additional information from both the reporter and the content creator</li>
          <li>Determine whether the content violates our policies</li>
          <li>Remove content that violates our policies</li>
          <li>Restore content that we determine does not violate our policies</li>
        </ul>
        <p>
          <strong>4.3 Legal Notices:</strong> If you believe content on our platform violates your legal rights, please send a formal notice to our designated agent at legal@peerfolio.com with detailed information about the content and the specific legal violation. We will review and respond to properly submitted notices in accordance with applicable laws.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">5. Disclaimer of Warranties and Limitation of Liability</h2>
        <p>
          <strong>5.1 Service Provided "As Is":</strong> OUR SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
        </p>
        <p>
          <strong>5.2 Content Disclaimer:</strong> WE DO NOT CONTROL OR VET USER CONTENT FOR ACCURACY, COMPLETENESS, OR RELIABILITY. REVIEWS AND RATINGS REFLECT THE OPINIONS OF INDIVIDUAL USERS AND DO NOT REPRESENT OUR VIEWS OR OPINIONS. WE DO NOT ENDORSE ANY SPECIFIC OPINIONS, RECOMMENDATIONS, OR ADVICE EXPRESSED IN USER CONTENT.
        </p>
        <p>
          <strong>5.3 Limitation of Liability:</strong> TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL PEERFOLIO, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
        </p>
        <ul className="list-disc pl-8 my-4">
          <li>YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICES</li>
          <li>ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICES</li>
          <li>ANY CONTENT OBTAINED FROM THE SERVICES</li>
          <li>UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT</li>
        </ul>
        <p>
          <strong>5.4 Cap on Liability:</strong> NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, OUR LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER AND REGARDLESS OF THE FORM OF THE ACTION, WILL AT ALL TIMES BE LIMITED TO THE AMOUNT PAID, IF ANY, BY YOU TO US FOR THE SERVICES DURING THE PERIOD OF 12 MONTHS PRIOR TO ANY CAUSE OF ACTION ARISING.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">6. Indemnification</h2>
        <p>
          You agree to defend, indemnify, and hold harmless PeerFolio, its officers, directors, employees, and agents, from and against any claims, liabilities, damages, losses, and expenses, including, without limitation, reasonable legal and accounting fees, arising out of or in any way connected with your access to or use of the Services, your violation of these Terms, or your violation of any third-party rights, including without limitation any copyright, property, or privacy right.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">7. Governing Law and Jurisdiction</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. You agree that any legal action or proceeding arising out of or relating to these Terms or your use of our Services shall be brought exclusively in the courts located in India, and you consent to the personal jurisdiction and venue of such courts.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">8. International Use</h2>
        <p>
          Our Services are controlled, operated, and administered from our offices within India. If you access our Services from a location outside India, you are responsible for compliance with all local laws. You agree that you will not use our Services in any country or in any manner prohibited by any applicable laws, restrictions, or regulations.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">9. Changes to Terms</h2>
        <p>
          We reserve the right to modify these Terms at any time. We will provide notice of significant changes by posting the updated Terms on our website and updating the "Last Updated" date. Your continued use of our Services after such changes constitutes your acceptance of the new Terms.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">10. Termination</h2>
        <p>
          We may terminate or suspend your account and access to our Services immediately, without prior notice or liability, for any reason, including, without limitation, if you breach these Terms. Upon termination, your right to use the Services will immediately cease.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">11. Contact Information</h2>
        <p>
          If you have any questions about these Terms, please contact us at:
        </p>
        <p>
          Email: nullcodeai@gmail.com
        </p>
      </div>
    </div>
  );
} 