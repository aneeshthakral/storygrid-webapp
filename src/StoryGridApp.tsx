import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import { SectionLightProvider } from "@/context/SectionLightContext";
import HomePage from "@/pages/HomePage";
import ApproachPage from "@/pages/ApproachPage";
import ServicesPage from "@/pages/ServicesPage";
import TierDetailPage from "@/pages/TierDetailPage";
import AIAutomationPage from "@/pages/AIAutomationPage";
import DigitalMarketingPage from "@/pages/DigitalMarketingPage";
import StoryPage from "@/pages/StoryPage";
import ForTeamsPage from "@/pages/ForTeamsPage";
import ResourcesPage from "@/pages/ResourcesPage";
import ContactPage from "@/pages/ContactPage";
import PrivacyPage from "@/pages/PrivacyPage";
import WorkPolicyPage from "@/pages/WorkPolicyPage";
import NotFoundPage from "@/pages/NotFoundPage";

export default function App() {
  return (
    <SectionLightProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/approach" element={<ApproachPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:tierId" element={<TierDetailPage />} />
          <Route path="/ai-automation" element={<AIAutomationPage />} />
          <Route path="/digital-marketing" element={<DigitalMarketingPage />} />
          <Route path="/story" element={<StoryPage />} />
          <Route path="/for-teams" element={<ForTeamsPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/work-policy" element={<WorkPolicyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </SectionLightProvider>
  );
}
