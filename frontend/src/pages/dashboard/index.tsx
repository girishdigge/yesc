import PageHead from '@/components/shared/page-head.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent } from '@/components/ui/tabs.js';
import RecentSales from './components/recent-sales.js';
// import AreaGraph from './components/area-graph.js';
// import PieGraph from './components/pie-graph.js';
import Overview from './components/overview.js';
// import UserNav from '@/components/shared/user-nav.js';
import { ModeToggle } from '@/components/shared/theme-toggle.js';
import { ScrollArea } from '@/components/ui/scroll-area.js';
import Auth from '@/lib/auth.js';
import TopTabs from './components/top-tabs.js';
const role = localStorage.getItem('role') || '';
export default function DashboardPage() {
  const { first_name, last_name } = Auth();

  return (
    <>
      <PageHead title="Dashboard | YSEC" />
      <ScrollArea className="h-full">
        <div className="max-h-screen flex-1 space-y-4  p-4 pt-6 md:p-8">
          <div className="flex justify-between">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">
                Hi, Welcome {first_name} {last_name}👋
              </h2>
            </div>
            <div className="hidden md:flex md:items-center">
              {/* <UserNav /> */}
              <ModeToggle />
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsContent value="overview" className="space-y-4">
              <TopTabs />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
                  </CardContent>
                </Card>
                {(role === 'root' || role === 'admin') && (
                  <Card className="col-span-4 md:col-span-3">
                    <CardHeader>
                      <CardTitle>Pending to Mail</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <RecentSales />
                    </CardContent>
                  </Card>
                )}

                <div className="col-span-4">{/* <AreaGraph /> */}</div>
                <div className="col-span-4 md:col-span-3">
                  {/* <PieGraph /> */}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    </>
  );
}
