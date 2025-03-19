"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ChevronRight,
  Copy,
  Edit,
  Mail,
  Phone,
  Plus,
  Trash2,
  MessageSquare,
  Tag,
  GitFork,
  Building2,
  MapPin,
  Globe2,
  Clock,
  Calendar,
  ShoppingBag,
  DollarSign,
  Languages,
  CalendarClock,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

interface CustomerOrder {
  id: string
  date: string
  amount: string
}

interface CustomerDetailsSidebarProps {
  isOpen: boolean
  onClose: () => void
  customer?: {
    name: string
    email: string
    phone: string
    status: "online" | "offline" | "away"
    initials: string
    company?: string
    position?: string
    location?: string
    timezone?: string
    lastContact?: string
    customerSince?: string
    totalOrders?: number
    lifetimeValue?: string
    preferredLanguage?: string
    tags?: string[]
    recentOrders?: CustomerOrder[]
    assignedTeam?: string
    priority?: string
    subscriptionPlan?: string
    nextFollowUp?: string
  }
}

export function CustomerDetailsSidebar({
  isOpen,
  onClose,
  customer = {
    name: "John Doe",
    email: "john.doe@acme.com",
    phone: "+1 (555) 123-4567",
    status: "online",
    initials: "JD",
    company: "Acme Corporation",
    position: "Product Manager",
    location: "San Francisco, CA",
    timezone: "PST",
    lastContact: "2024-02-15",
    customerSince: "2023-05-01",
    totalOrders: 15,
    lifetimeValue: "$2,450",
    preferredLanguage: "English",
    tags: ["VIP", "Enterprise", "Product Beta"],
    recentOrders: [
      { id: "ORD-12345", date: "2024-02-10", amount: "$350" },
      { id: "ORD-12344", date: "2024-01-25", amount: "$180" },
    ],
    assignedTeam: "Enterprise Support",
    priority: "high",
    subscriptionPlan: "Enterprise",
    nextFollowUp: "2024-02-20",
  },
}: CustomerDetailsSidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    profile: true,
    actions: true,
    labels: true,
    orders: true,
    info: true,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // You could add a toast notification here
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <div
      className={cn(
        "absolute inset-0 h-full w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="flex h-14 items-center justify-between border-b px-4">
        <h2 className="text-lg font-semibold">Customer Details</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="h-[calc(100%-3.5rem)]">
        <div className="flex flex-col space-y-6 p-4">
          {/* Customer Profile */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">Profile</h4>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleSection("profile")}
              >
                <ChevronRight
                  className={cn(
                    "h-4 w-4 transition-transform",
                    expandedSections.profile && "rotate-90"
                  )}
                />
              </Button>
            </div>
            {expandedSections.profile && (
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="text-lg">{customer.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">{customer.name}</h3>
                      <Badge
                        variant={customer.status === "online" ? "default" : "secondary"}
                        className={cn(
                          "capitalize",
                          customer.status === "online" && "bg-green-500 hover:bg-green-500/90"
                        )}
                      >
                        {customer.status}
                      </Badge>
                    </div>
                    {customer.position && customer.company && (
                      <p className="text-sm text-muted-foreground">
                        {customer.position} at {customer.company}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Mail className="mr-2 h-4 w-4" />
                      {customer.email}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => copyToClipboard(customer.email)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Phone className="mr-2 h-4 w-4" />
                      {customer.phone}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => copyToClipboard(customer.phone)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                  {customer.location && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="mr-2 h-4 w-4" />
                      {customer.location}
                    </div>
                  )}
                  {customer.timezone && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Globe2 className="mr-2 h-4 w-4" />
                      {customer.timezone}
                    </div>
                  )}
                </div>

                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <GitFork className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Customer Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Customer Since</p>
              <p className="text-sm font-medium">{customer.customerSince}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Total Orders</p>
              <p className="text-sm font-medium">{customer.totalOrders}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Lifetime Value</p>
              <p className="text-sm font-medium">{customer.lifetimeValue}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Language</p>
              <p className="text-sm font-medium">{customer.preferredLanguage}</p>
            </div>
          </div>

          <Separator />

          {/* Conversation Actions */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">Conversation Actions</h4>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleSection("actions")}
              >
                <ChevronRight
                  className={cn(
                    "h-4 w-4 transition-transform",
                    expandedSections.actions && "rotate-90"
                  )}
                />
              </Button>
            </div>
            {expandedSections.actions && (
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-muted-foreground">
                      Assigned Team
                    </label>
                    <Button variant="link" className="h-auto p-0 text-sm">
                      Change
                    </Button>
                  </div>
                  <Select defaultValue={customer.assignedTeam?.toLowerCase()}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select team" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="enterprise">Enterprise Support</SelectItem>
                      <SelectItem value="technical">Technical Support</SelectItem>
                      <SelectItem value="customer">Customer Success</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <label className="text-sm text-muted-foreground">Priority</label>
                  <Select defaultValue={customer.priority}>
                    <SelectTrigger>
                      <SelectValue placeholder="Set priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High Priority</SelectItem>
                      <SelectItem value="medium">Medium Priority</SelectItem>
                      <SelectItem value="low">Low Priority</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <label className="text-sm text-muted-foreground">
                    Next Follow-up
                  </label>
                  <div className="flex items-center text-sm">
                    <CalendarClock className="mr-2 h-4 w-4" />
                    {customer.nextFollowUp}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">Tags</h4>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleSection("labels")}
                >
                  <ChevronRight
                    className={cn(
                      "h-4 w-4 transition-transform",
                      expandedSections.labels && "rotate-90"
                    )}
                  />
                </Button>
              </div>
            </div>
            {expandedSections.labels && customer.tags && (
              <div className="flex flex-wrap gap-2">
                {customer.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="flex items-center gap-1"
                  >
                    <Tag className="h-3 w-3" />
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Recent Orders */}
          {customer.recentOrders && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Recent Orders</h4>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleSection("orders")}
                >
                  <ChevronRight
                    className={cn(
                      "h-4 w-4 transition-transform",
                      expandedSections.orders && "rotate-90"
                    )}
                  />
                </Button>
              </div>
              {expandedSections.orders && (
                <div className="space-y-2">
                  {customer.recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between rounded-lg border p-2 text-sm"
                    >
                      <div className="space-y-1">
                        <p className="font-medium">{order.id}</p>
                        <p className="text-xs text-muted-foreground">{order.date}</p>
                      </div>
                      <p className="font-medium">{order.amount}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Subscription Info */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">Subscription</h4>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleSection("info")}
              >
                <ChevronRight
                  className={cn(
                    "h-4 w-4 transition-transform",
                    expandedSections.info && "rotate-90"
                  )}
                />
              </Button>
            </div>
            {expandedSections.info && (
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Plan</span>
                  <span>{customer.subscriptionPlan}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Contact</span>
                  <span>{customer.lastContact}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Next Follow-up</span>
                  <span>{customer.nextFollowUp}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  )
} 