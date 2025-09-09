import React from "react"

export default function Dashboard() {
  return (
      <div className="flex flex-1 flex-col gap-4  pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900 p-6 flex items-center justify-center">
            <div className="text-center">
              <h3 className="font-semibold text-lg mb-2">Total Revenue</h3>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">$45,231</p>
            </div>
          </div>
          <div className="aspect-video rounded-xl bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-900 p-6 flex items-center justify-center">
            <div className="text-center">
              <h3 className="font-semibold text-lg mb-2">Active Users</h3>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">2,350</p>
            </div>
          </div>
          <div className="aspect-video rounded-xl bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-950 dark:to-violet-900 p-6 flex items-center justify-center">
            <div className="text-center">
              <h3 className="font-semibold text-lg mb-2">Orders</h3>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">1,234</p>
            </div>
          </div>
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-6">
          <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="flex items-center space-x-4 p-4 bg-background rounded-lg border border-gray-200"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold">
                  {item}
                </div>
                <div className="flex-1">
                  <p className="font-medium">Activity {item}</p>
                  <p className="text-sm text-muted-foreground">
                    Description for activity {item}
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">{item} min ago</div>
              </div>
            ))}
          </div>
        </div>
      </div>
  )
}
