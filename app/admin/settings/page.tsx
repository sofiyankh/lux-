"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Store, CreditCard, Truck, Users, Bell, Palette, Globe, Save } from "lucide-react"

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    lowStock: true,
    newReviews: false,
    marketing: true,
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your store configuration and preferences</p>
        </div>
        <Button className="bg-amber-600 hover:bg-amber-700">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Store className="h-5 w-5 text-gray-600" />
              <h3 className="font-display text-lg font-semibold text-gray-900">Store Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="storeName">Store Name</Label>
                <Input id="storeName" defaultValue="Fashion Store" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="storeUrl">Store URL</Label>
                <Input id="storeUrl" defaultValue="https://fashionstore.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input id="contactEmail" type="email" defaultValue="contact@fashionstore.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supportPhone">Support Phone</Label>
                <Input id="supportPhone" defaultValue="+1 (555) 123-4567" />
              </div>
            </div>
            <div className="mt-6 space-y-2">
              <Label htmlFor="storeDescription">Store Description</Label>
              <Textarea
                id="storeDescription"
                defaultValue="Premium fashion retailer offering curated collections of contemporary clothing and accessories."
                className="min-h-[100px]"
              />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="h-5 w-5 text-gray-600" />
              <h3 className="font-display text-lg font-semibold text-gray-900">Localization</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="currency">Default Currency</Label>
                <Select defaultValue="usd">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD ($)</SelectItem>
                    <SelectItem value="eur">EUR (€)</SelectItem>
                    <SelectItem value="gbp">GBP (£)</SelectItem>
                    <SelectItem value="cad">CAD (C$)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="est">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="est">Eastern Time (EST)</SelectItem>
                    <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                    <SelectItem value="cst">Central Time (CST)</SelectItem>
                    <SelectItem value="mst">Mountain Time (MST)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Default Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="h-5 w-5 text-gray-600" />
              <h3 className="font-display text-lg font-semibold text-gray-900">Payment Methods</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">VISA</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Credit Cards</p>
                    <p className="text-sm text-gray-600">Visa, Mastercard, American Express</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-6 bg-blue-500 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">PP</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">PayPal</p>
                    <p className="text-sm text-gray-600">PayPal and PayPal Credit</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-6 bg-green-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">$</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Apple Pay</p>
                    <p className="text-sm text-gray-600">Apple Pay and Apple Pay Later</p>
                  </div>
                </div>
                <Switch />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-display text-lg font-semibold text-gray-900 mb-6">Tax Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="taxRate">Default Tax Rate (%)</Label>
                <Input id="taxRate" type="number" defaultValue="8.25" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="taxRegion">Tax Region</Label>
                <Select defaultValue="us">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="eu">European Union</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-4 flex items-center space-x-2">
              <Switch id="includeTax" />
              <Label htmlFor="includeTax">Include tax in product prices</Label>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="shipping" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Truck className="h-5 w-5 text-gray-600" />
              <h3 className="font-display text-lg font-semibold text-gray-900">Shipping Options</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Standard Shipping</p>
                  <p className="text-sm text-gray-600">5-7 business days - $9.99</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Express Shipping</p>
                  <p className="text-sm text-gray-600">2-3 business days - $19.99</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Overnight Shipping</p>
                  <p className="text-sm text-gray-600">Next business day - $39.99</p>
                </div>
                <Switch />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-display text-lg font-semibold text-gray-900 mb-6">Free Shipping</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="freeShipping" defaultChecked />
                <Label htmlFor="freeShipping">Enable free shipping threshold</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="freeShippingThreshold">Minimum order amount for free shipping</Label>
                <Input id="freeShippingThreshold" type="number" defaultValue="75" />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="h-5 w-5 text-gray-600" />
              <h3 className="font-display text-lg font-semibold text-gray-900">Email Notifications</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Order Updates</p>
                  <p className="text-sm text-gray-600">Notifications for new orders and status changes</p>
                </div>
                <Switch
                  checked={notifications.orderUpdates}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, orderUpdates: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Low Stock Alerts</p>
                  <p className="text-sm text-gray-600">Alerts when products are running low</p>
                </div>
                <Switch
                  checked={notifications.lowStock}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, lowStock: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">New Reviews</p>
                  <p className="text-sm text-gray-600">Notifications for new customer reviews</p>
                </div>
                <Switch
                  checked={notifications.newReviews}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, newReviews: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Marketing Updates</p>
                  <p className="text-sm text-gray-600">Updates about promotions and campaigns</p>
                </div>
                <Switch
                  checked={notifications.marketing}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, marketing: checked })}
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Users className="h-5 w-5 text-gray-600" />
              <h3 className="font-display text-lg font-semibold text-gray-900">User Management</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Allow User Registration</p>
                  <p className="text-sm text-gray-600">Let customers create accounts</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Email Verification Required</p>
                  <p className="text-sm text-gray-600">Require email verification for new accounts</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Guest Checkout</p>
                  <p className="text-sm text-gray-600">Allow purchases without creating an account</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Palette className="h-5 w-5 text-gray-600" />
              <h3 className="font-display text-lg font-semibold text-gray-900">Theme Settings</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="primaryColor">Primary Color</Label>
                <div className="flex items-center gap-3">
                  <Input id="primaryColor" defaultValue="#F59E0B" />
                  <div className="w-10 h-10 bg-amber-500 rounded-lg border border-gray-200"></div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="secondaryColor">Secondary Color</Label>
                <div className="flex items-center gap-3">
                  <Input id="secondaryColor" defaultValue="#6B7280" />
                  <div className="w-10 h-10 bg-gray-500 rounded-lg border border-gray-200"></div>
                </div>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Dark Mode</p>
                  <p className="text-sm text-gray-600">Enable dark theme option</p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Compact Layout</p>
                  <p className="text-sm text-gray-600">Use more compact spacing</p>
                </div>
                <Switch />
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
