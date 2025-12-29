import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Eye, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventOverviewTab from "@/components/events/EventOverviewTab";
import EventThemesTab from "@/components/events/EventThemesTab";
import EventPagesTab from "@/components/events/EventPagesTab";
import EventFormsTab from "@/components/events/EventFormsTab";
import EventStallsTab from "@/components/events/EventStallsTab";
import EventPublishTab from "@/components/events/EventPublishTab";

const EventEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const isNew = id === "new";

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/events")}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              {isNew ? "Create New Event" : "Tech Summit 2024"}
            </h1>
            <p className="text-muted-foreground mt-0.5">
              {isNew ? "Set up your event details" : "Last edited 2 hours ago"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Save className="w-4 h-4" />
            Save Draft
          </Button>
          <Button variant="outline" className="gap-2">
            <Eye className="w-4 h-4" />
            Preview
          </Button>
          <Button className="gap-2">
            <Upload className="w-4 h-4" />
            Publish
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent p-0 h-auto">
          <TabsTrigger
            value="overview"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="themes"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
          >
            Themes
          </TabsTrigger>
          <TabsTrigger
            value="pages"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
          >
            Pages / Layout
          </TabsTrigger>
          <TabsTrigger
            value="forms"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
          >
            Forms
          </TabsTrigger>
          <TabsTrigger
            value="stalls"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
          >
            Stalls
          </TabsTrigger>
          <TabsTrigger
            value="publish"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
          >
            Publish
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <EventOverviewTab />
        </TabsContent>
        <TabsContent value="themes" className="mt-6">
          <EventThemesTab />
        </TabsContent>
        <TabsContent value="pages" className="mt-6">
          <EventPagesTab />
        </TabsContent>
        <TabsContent value="forms" className="mt-6">
          <EventFormsTab />
        </TabsContent>
        <TabsContent value="stalls" className="mt-6">
          <EventStallsTab />
        </TabsContent>
        <TabsContent value="publish" className="mt-6">
          <EventPublishTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventEditor;
