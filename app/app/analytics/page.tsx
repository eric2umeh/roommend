'use client'

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Analytics & Reports</h1>
        <p className="text-slate-600 mt-2">View detailed insights and performance metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="text-sm text-slate-600 mb-2">Total Revenue (This Month)</div>
          <div className="text-3xl font-bold text-green-600">₦2,850,000</div>
          <p className="text-xs text-slate-500 mt-2">↑ 12% from last month</p>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="text-sm text-slate-600 mb-2">Average Occupancy</div>
          <div className="text-3xl font-bold text-blue-600">78%</div>
          <p className="text-xs text-slate-500 mt-2">↑ 5% from last month</p>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="text-sm text-slate-600 mb-2">Guest Satisfaction</div>
          <div className="text-3xl font-bold text-purple-600">4.7/5</div>
          <p className="text-xs text-slate-500 mt-2">Based on 145 reviews</p>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="text-sm text-slate-600 mb-2">Total Guests (This Month)</div>
          <div className="text-3xl font-bold text-orange-600">342</div>
          <p className="text-xs text-slate-500 mt-2">↑ 18 new guests</p>
        </div>
      </div>

      {/* Department Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Department Performance</h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">Front Desk</span>
                <span className="text-sm font-bold text-slate-900">92%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">Housekeeping</span>
                <span className="text-sm font-bold text-slate-900">87%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '87%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">Restaurant</span>
                <span className="text-sm font-bold text-slate-900">95%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">Finance</span>
                <span className="text-sm font-bold text-slate-900">98%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '98%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Organization Types Hosted</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-700">Government Events</span>
              <div className="text-right">
                <div className="text-lg font-bold text-slate-900">12</div>
                <span className="text-xs text-slate-500">285 rooms</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-700">NGO Conferences</span>
              <div className="text-right">
                <div className="text-lg font-bold text-slate-900">8</div>
                <span className="text-xs text-slate-500">156 rooms</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-700">Corporate Events</span>
              <div className="text-right">
                <div className="text-lg font-bold text-slate-900">15</div>
                <span className="text-xs text-slate-500">420 rooms</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-700">Individual Bookings</span>
              <div className="text-right">
                <div className="text-lg font-bold text-slate-900">342</div>
                <span className="text-xs text-slate-500">1,240 rooms</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Breakdown */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Revenue Sources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">₦1,850,000</div>
            <p className="text-sm text-slate-600">Room Revenue (65%)</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">₦750,000</div>
            <p className="text-sm text-slate-600">Food & Beverage (26%)</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">₦250,000</div>
            <p className="text-sm text-slate-600">Other Services (9%)</p>
          </div>
        </div>
      </div>
    </div>
  )
}
