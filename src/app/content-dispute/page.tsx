import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Content Dispute Policy | PeerFolio",
  description: "PeerFolio's policy on handling content disputes and removal requests",
};

export default function ContentDisputePage() {
  return (
    <div className="container max-w-4xl py-10">
      <h1 className="text-3xl font-bold mb-6">Content Dispute Policy</h1>
      <div className="prose max-w-none">
        <p className="text-sm text-gray-500 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
          <p className="text-blue-700">
            This policy outlines how PeerFolio handles disputes related to content posted on our platform, including 
            allegations of defamation, false information, privacy violations, and other concerns. We are committed to 
            maintaining a fair and balanced approach that respects both freedom of expression and the protection of 
            individuals' reputations and rights.
          </p>
        </div>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">1. Our Approach to Content Disputes</h2>
        <p>
          PeerFolio is a platform that enables professionals to share genuine reviews and feedback about their colleagues
          and business connections. We recognize that professional reviews can sometimes lead to disputes, especially when
          individuals disagree with how they are portrayed. We take a balanced approach to handling these disputes, with the
          following principles guiding our decisions:
        </p>
        <ul className="list-disc pl-8 my-4">
          <li>We value honest, factual feedback based on real professional interactions</li>
          <li>We do not tolerate deliberately false or malicious content</li>
          <li>We respect legal requirements across different jurisdictions</li>
          <li>We aim to provide all parties with a fair opportunity to address concerns</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">2. Grounds for Content Dispute</h2>
        <p>
          You may dispute content posted on PeerFolio if you believe it meets one or more of the following criteria:
        </p>
        <ul className="list-disc pl-8 my-4">
          <li><strong>False Information:</strong> The review contains demonstrably false statements of fact (not opinions)</li>
          <li><strong>No Professional Relationship:</strong> The reviewer has never had a genuine professional interaction with you</li>
          <li><strong>Personally Identifiable Information:</strong> The content reveals private information that shouldn't be publicly disclosed</li>
          <li><strong>Harassment or Threats:</strong> The content constitutes harassment, threats, or incitement to violence</li>
          <li><strong>Discriminatory Content:</strong> The content discriminates on the basis of race, gender, religion, etc.</li>
          <li><strong>Intellectual Property Violation:</strong> The content infringes upon your intellectual property rights</li>
          <li><strong>Legal Violation:</strong> The content otherwise violates applicable laws</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">3. Content Dispute Process</h2>
        <h3 className="text-lg font-medium mt-6 mb-3">3.1 Reporting Disputed Content</h3>
        <p>
          If you wish to dispute content on our platform, please follow these steps:
        </p>
        <ol className="list-decimal pl-8 my-4">
          <li>
            <strong>Use our in-platform reporting tool:</strong> Navigate to the review in question and click the "Report this review" option. 
            Provide as much detail as possible about why you believe the content violates our policies.
          </li>
          <li>
            <strong>For serious legal matters:</strong> Send a detailed email to nullcodeai@gmail.com with the subject line "Content Dispute." 
            Include the URL of the disputed content, your relationship to the content, the specific statements you dispute, and any evidence 
            supporting your position.
          </li>
        </ol>
        
        <h3 className="text-lg font-medium mt-6 mb-3">3.2 Our Review Process</h3>
        <p>
          Once we receive your dispute, we will:
        </p>
        <ol className="list-decimal pl-8 my-4">
          <li>Acknowledge receipt of your dispute within 2 business days</li>
          <li>Conduct an initial assessment to determine if the content potentially violates our policies</li>
          <li>If appropriate, temporarily flag the content as "Under Review" while we investigate</li>
          <li>Contact the content author to provide them with an opportunity to respond to the dispute</li>
          <li>Review all available evidence and make a determination based on our policies</li>
          <li>Notify both parties of our decision and any actions taken</li>
        </ol>
        
        <h3 className="text-lg font-medium mt-6 mb-3">3.3 Possible Outcomes</h3>
        <p>
          After reviewing a content dispute, we may take one or more of the following actions:
        </p>
        <ul className="list-disc pl-8 my-4">
          <li><strong>No Action:</strong> If we determine the content does not violate our policies</li>
          <li><strong>Content Removal:</strong> Remove the content entirely if it clearly violates our policies</li>
          <li><strong>Content Editing:</strong> Request the author to edit specific portions of the content</li>
          <li><strong>Add a Response:</strong> Allow you to post a public response to the disputed content</li>
          <li><strong>Add a Disclaimer:</strong> Attach a note indicating that the content is disputed</li>
          <li><strong>Account Action:</strong> Take action against accounts that repeatedly post violating content</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">4. Important Legal Disclaimers</h2>
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6">
          <p className="text-amber-800 font-medium">Section 230 Protection (United States)</p>
          <p className="text-amber-700 text-sm mt-1">
            In the United States, PeerFolio operates under the protection of Section 230 of the Communications Decency Act, 
            which provides that "No provider or user of an interactive computer service shall be treated as the publisher or 
            speaker of any information provided by another information content provider." This means that, under U.S. law, 
            PeerFolio is generally not liable for the content posted by our users.
          </p>
        </div>
        
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6">
          <p className="text-amber-800 font-medium">Intermediary Liability Protection (International)</p>
          <p className="text-amber-700 text-sm mt-1">
            Many countries have similar laws that protect online platforms from liability for user-generated content, 
            such as the E-Commerce Directive in the EU, the Digital Services Act, and similar regulations in other jurisdictions. 
            We comply with local requirements for content removal when properly notified according to applicable laws.
          </p>
        </div>
        
        <p>
          While we maintain these legal protections, we are committed to being a responsible platform that respects the rights 
          of individuals and complies with applicable laws. Our content dispute process is designed to balance free expression 
          with protection against genuinely harmful content.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">5. Truth as a Defense</h2>
        <p>
          In most jurisdictions, truth is an absolute defense against defamation claims. Our policies reflect this principle. 
          We will generally not remove content that is demonstrably true, even if it portrays an individual in a negative light. 
          However, we will consider whether the content violates other policies, such as those regarding privacy or harassment.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">6. International Considerations</h2>
        <p>
          We recognize that defamation and content laws vary significantly across different countries. When handling content disputes 
          that involve international elements, we consider:
        </p>
        <ul className="list-disc pl-8 my-4">
          <li>The location of the parties involved</li>
          <li>The location of our servers and company</li>
          <li>The specific requirements of applicable local laws</li>
          <li>International standards for freedom of expression</li>
        </ul>
        <p>
          In some cases, content may be restricted in specific geographic regions if it violates local laws but does not 
          violate our global policies or the laws of our home jurisdiction.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">7. Court Orders and Legal Requests</h2>
        <p>
          We respect valid court orders and legal requirements. If you have obtained a court order requiring the removal of 
          content from our platform, please submit it to nullcodeai@gmail.com along with appropriate documentation verifying 
          its authenticity. We will review and process valid legal orders in accordance with applicable laws.
        </p>
        
        <div className="bg-gray-100 rounded-lg p-6 my-8">
          <h2 className="text-xl font-semibold mb-4">Need to Submit a Content Dispute?</h2>
          <p className="mb-4">
            If you believe content on our platform violates our policies or your rights, you have two options:
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/report" className="w-full sm:w-auto">
              <Button className="w-full py-2.5 whitespace-normal">
                Use Our Reporting Tool
              </Button>
            </Link>
            <a href="mailto:nullcodeai@gmail.com" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full py-2.5 whitespace-normal">
                Email Our Legal Team
              </Button>
            </a>
          </div>
        </div>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">8. Changes to This Policy</h2>
        <p>
          We may update this Content Dispute Policy from time to time to reflect changes in our practices, the law, or 
          other factors. We will post the updated policy on our website and update the "Last Updated" date. We encourage 
          you to review this policy periodically.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">9. Contact Information</h2>
        <p>
          If you have any questions about this Content Dispute Policy, please contact us at:
        </p>
        <p>
          Email: nullcodeai@gmail.com
        </p>
      </div>
    </div>
  );
} 