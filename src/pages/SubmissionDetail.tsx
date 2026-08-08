import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Phone,
  Building2,
  Briefcase,
  Calendar,
  Clock,
  CreditCard,
  CheckCircle2,
  Download,
  Archive,
  Printer,
  Send,
  MoreHorizontal,
  Globe,
  MapPin,
  FileText,
  DollarSign,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { StatusBadge } from "@/components/ui/status-badge";
import { SiteBadge } from "@/components/ui/site-badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type SubmissionStatus = "new" | "reviewed" | "archived";
type Site = "nbt" | "fe";

interface PaymentDetail {
  status: "paid" | "pending" | "failed" | "refunded";
  amount: string;
  method: string;
  transactionId: string;
  paidAt: string;
}

interface TimelineEvent {
  id: string;
  label: string;
  timestamp: string;
  actor?: string;
}

interface FormResponse {
  id: string;
  label: string;
  value: string;
}

interface SubmissionDetail {
  id: string;
  formName: string;
  eventName: string;
  site: Site;
  submittedAt: string;
  status: SubmissionStatus;
  submitter: {
    name: string;
    email: string;
    phone: string;
    company: string;
    jobTitle: string;
    location: string;
  };
  responses: FormResponse[];
  payment: PaymentDetail;
  timeline: TimelineEvent[];
  metadata: {
    source: string;
    ipAddress: string;
    userAgent: string;
    referrer: string;
  };
}

const mockSubmissionDetails: SubmissionDetail[] = [
  {
    id: "1",
    formName: "Event Registration",
    eventName: "Tech Summit 2024",
    site: "nbt",
    submittedAt: "Dec 28, 2024 at 4:30 PM",
    status: "new",
    submitter: {
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+1 (555) 123-4567",
      company: "Acme Corporation",
      jobTitle: "Product Manager",
      location: "San Francisco, CA",
    },
    responses: [
      { id: "r1", label: "Attendance Type", value: "In-person" },
      { id: "r2", label: "Dietary Requirements", value: "Vegetarian" },
      { id: "r3", label: "Session Track", value: "Product & Design" },
      { id: "r4", label: "How did you hear about us?", value: "LinkedIn post" },
      { id: "r5", label: "Questions or comments", value: "Looking forward to the networking session. Please send the agenda ahead of time if possible." },
    ],
    payment: {
      status: "paid",
      amount: "$299.00",
      method: "Visa ending in 4242",
      transactionId: "txn_9x8Jk2mNp0Qq",
      paidAt: "Dec 28, 2024 at 4:31 PM",
    },
    timeline: [
      { id: "t1", label: "Submission received", timestamp: "Dec 28, 2024 at 4:30 PM" },
      { id: "t2", label: "Payment confirmed", timestamp: "Dec 28, 2024 at 4:31 PM" },
      { id: "t3", label: "Confirmation email sent", timestamp: "Dec 28, 2024 at 4:32 PM" },
    ],
    metadata: {
      source: "Website embed",
      ipAddress: "203.0.113.42",
      userAgent: "Chrome 120 on macOS",
      referrer: "https://nbtworld.com/events/tech-summit-2024",
    },
  },
  {
    id: "2",
    formName: "Speaker Application",
    eventName: "Tech Summit 2024",
    site: "fe",
    submittedAt: "Dec 28, 2024 at 3:15 PM",
    status: "reviewed",
    submitter: {
      name: "Jane Smith",
      email: "jane.smith@company.com",
      phone: "+1 (555) 987-6543",
      company: "Company Inc.",
      jobTitle: "Engineering Lead",
      location: "New York, NY",
    },
    responses: [
      { id: "r1", label: "Talk Title", value: "Scaling Design Systems" },
      { id: "r2", label: "Talk Abstract", value: "A deep dive into how we scaled our design system across 12 product teams while maintaining consistency and accessibility." },
      { id: "r3", label: "Speaker Bio", value: "Jane leads the design engineering team at Company Inc. and has spoken at Figma Config and Config previously." },
      { id: "r4", label: "Previous Speaking Experience", value: "Yes — 5+ conferences" },
      { id: "r5", label: "Travel Assistance Needed", value: "No" },
    ],
    payment: {
      status: "pending",
      amount: "$0.00",
      method: "N/A",
      transactionId: "—",
      paidAt: "—",
    },
    timeline: [
      { id: "t1", label: "Submission received", timestamp: "Dec 28, 2024 at 3:15 PM" },
      { id: "t2", label: "Marked as reviewed", timestamp: "Dec 29, 2024 at 9:12 AM", actor: "by Sarah Chen" },
    ],
    metadata: {
      source: "Direct link",
      ipAddress: "198.51.100.7",
      userAgent: "Safari 17 on iOS",
      referrer: "https://femail.com/call-for-speakers",
    },
  },
];

const statusMap: Record<SubmissionStatus, "draft" | "published" | "archived"> = {
  new: "draft",
  reviewed: "published",
  archived: "archived",
};

const paymentStatusConfig: Record<
  PaymentDetail["status"],
  { label: string; className: string; icon: React.ReactNode }
> = {
  paid: {
    label: "Paid",
    className: "bg-status-success-bg text-status-success",
    icon: <CheckCircle2 className="w-4 h-4" />,
  },
  pending: {
    label: "Pending",
    className: "bg-status-warning-bg text-status-warning",
    icon: <Clock className="w-4 h-4" />,
  },
  failed: {
    label: "Failed",
    className: "bg-status-error-bg text-status-error",
    icon: <ShieldCheck className="w-4 h-4" />,
  },
  refunded: {
    label: "Refunded",
    className: "bg-muted text-muted-foreground",
    icon: <DollarSign className="w-4 h-4" />,
  },
};

const SubmissionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const submission = mockSubmissionDetails.find((s) => s.id === id);

  if (!submission) {
    return (
      <div className="space-y-6 animate-fade-in">
        <Button variant="ghost" className="gap-2 -ml-3" onClick={() => navigate("/submissions")}>
          <ArrowLeft className="w-4 h-4" />
          Back to submissions
        </Button>
        <Card className="shadow-card">
          <CardContent className="p-10 text-center">
            <h2 className="text-lg font-semibold text-foreground">Submission not found</h2>
            <p className="text-muted-foreground mt-1">The submission you are looking for does not exist.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const paymentConfig = paymentStatusConfig[submission.payment.status];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Breadcrumb */}
      <Button variant="ghost" className="gap-2 -ml-3 h-8 text-sm" onClick={() => navigate("/submissions")}>
        <ArrowLeft className="w-4 h-4" />
        Back to submissions
      </Button>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-semibold text-foreground">{submission.submitter.name}</h1>
            <StatusBadge status={statusMap[submission.status]} />
            <SiteBadge site={submission.site} />
          </div>
          <p className="text-muted-foreground">
            Submitted <span className="text-foreground font-medium">{submission.formName}</span> for{" "}
            <span className="text-foreground font-medium">{submission.eventName}</span>
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="outline" className="gap-2">
            <Mail className="w-4 h-4" />
            Email
          </Button>
          <Button variant="outline" className="gap-2">
            <Printer className="w-4 h-4" />
            Print
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Download
          </Button>
          <Button variant="secondary" className="gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Mark Reviewed
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="gap-2">
                <Archive className="w-4 h-4" />
                Archive
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <Send className="w-4 h-4" />
                Resend confirmation
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Submitter profile */}
          <Card className="shadow-card">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-semibold">Submitter</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-accent-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Email</p>
                      <p className="text-sm font-medium text-foreground">{submission.submitter.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4 text-accent-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Phone</p>
                      <p className="text-sm font-medium text-foreground">{submission.submitter.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-accent-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Location</p>
                      <p className="text-sm font-medium text-foreground">{submission.submitter.location}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shrink-0">
                      <Building2 className="w-4 h-4 text-accent-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Company</p>
                      <p className="text-sm font-medium text-foreground">{submission.submitter.company}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shrink-0">
                      <Briefcase className="w-4 h-4 text-accent-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Job Title</p>
                      <p className="text-sm font-medium text-foreground">{submission.submitter.jobTitle}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Form responses */}
          <Card className="shadow-card">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <FileText className="w-4 h-4 text-muted-foreground" />
                Form Responses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-5">
                {submission.responses.map((response) => (
                  <div key={response.id}>
                    <dt className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{response.label}</dt>
                    <dd className="text-sm text-foreground leading-relaxed">{response.value}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>

          {/* Payment details */}
          <Card className="shadow-card">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-muted-foreground" />
                Payment Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium capitalize">
                  {paymentConfig.icon}
                  {paymentConfig.label}
                </span>
                <span className="text-lg font-semibold text-foreground">{submission.payment.amount}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Payment Method</p>
                  <p className="text-sm font-medium text-foreground">{submission.payment.method}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Transaction ID</p>
                  <p className="text-sm font-medium text-foreground font-mono">{submission.payment.transactionId}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Paid At</p>
                  <p className="text-sm font-medium text-foreground">{submission.payment.paidAt}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity timeline */}
          <Card className="shadow-card">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-semibold">Activity Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative pl-4">
                <div className="absolute left-[19px] top-2 bottom-2 w-px bg-border" />
                <ul className="space-y-6">
                  {submission.timeline.map((event) => (
                    <li key={event.id} className="relative flex items-start gap-4">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-background shrink-0 mt-1.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{event.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {event.timestamp}
                          {event.actor && <span className="text-muted-foreground"> {event.actor}</span>}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Metadata */}
          <Card className="shadow-card">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-semibold">Submission Metadata</CardTitle>
              <CardDescription>Technical and source information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Submitted At</p>
                    <p className="text-sm font-medium text-foreground">{submission.submittedAt}</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start gap-3">
                  <FileText className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Form</p>
                    <p className="text-sm font-medium text-foreground">{submission.formName}</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start gap-3">
                  <Globe className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Event</p>
                    <p className="text-sm font-medium text-foreground">{submission.eventName}</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Source</p>
                    <p className="text-sm font-medium text-foreground">{submission.metadata.source}</p>
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">IP Address</p>
                  <p className="text-sm font-medium text-foreground font-mono">{submission.metadata.ipAddress}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">User Agent</p>
                  <p className="text-sm font-medium text-foreground">{submission.metadata.userAgent}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick actions */}
          <Card className="shadow-card">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-semibold">Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <Button variant="secondary" className="w-full justify-start gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Mark as Reviewed
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Archive className="w-4 h-4" />
                  Archive Submission
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Send className="w-4 h-4" />
                  Resend Confirmation
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Download className="w-4 h-4" />
                  Export as PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SubmissionDetail;
