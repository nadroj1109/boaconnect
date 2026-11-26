import auth from "./auth.routes";
import activate from "./activate.routes";
import onboarding from "./onboarding.routes";
import dashboard from "./dashboard.routes";
import households from "./households.routes";
import residentregistrations from "./residentregistrations.routes";
import documentrequests from "./documentrequests.routes";
import complaints from "./complaints.routes";
import barangayofficials from "./barangayofficials.routes";
import users from "./users.routes";
import prenatalmonitoring from "./prenatalmonitoring.routes";
import childnutritionmonitoring from "./childnutritionmonitoring.routes";
import paymentcollections from "./paymentcollections.routes";
import management from "./management.routes";
import reports from "./reports.routes";
import profile from "./profile.routes";
import documentverification from "./documentverification.routes";

const routes = [

    auth,
    activate,
    onboarding,
    dashboard,
    households,
    residentregistrations,
    documentrequests,
    complaints,
    barangayofficials,
    users,
    prenatalmonitoring,
    childnutritionmonitoring,
    paymentcollections,
    management,
    reports,
    profile,
    documentverification,

];

export default routes;