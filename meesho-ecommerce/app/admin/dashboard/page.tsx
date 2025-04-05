"use client"

import { useState } from "react"
import Link from "next/link"
import {
  BarChart3,
  ShoppingCart,
  Package,
  Users,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AdminLayout } from "@/components/admin-layout"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function AdminDashboard() {
  const [period, setPeriod] = useState("7d")

  // Mock data
  const stats = [
    {
      title: "Total Revenue",
      value: "₹42,530",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Orders",
      value: "356",
      change: "+8.2%",
      trend: "up",
      icon: ShoppingCart,
    },
    {
      title: "Products",
      value: "1,245",
      change: "+24.5%",
      trend: "up",
      icon: Package,
    },
    {
      title: "Customers",
      value: "3,721",
      change: "-2.3%",
      trend: "down",
      icon: Users,
    },
  ]

  const recentOrders = [
    {
      id: "ORD-001",
      customer: "John Doe",
      date: "2023-06-12",
      amount: "₹1,250",
      status: "Delivered",
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      date: "2023-06-11",
      amount: "₹3,420",
      status: "Processing",
    },
    {
      id: "ORD-003",
      customer: "Robert Johnson",
      date: "2023-06-10",
      amount: "₹890",
      status: "Shipped",
    },
    {
      id: "ORD-004",
      customer: "Emily Davis",
      date: "2023-06-09",
      amount: "₹2,150",
      status: "Pending",
    },
    {
      id: "ORD-005",
      customer: "Michael Wilson",
      date: "2023-06-08",
      amount: "₹1,750",
      status: "Delivered",
    },
  ]

  const topProducts = [
    {
      id: "PROD-001",
      name: "Premium Cotton T-Shirt",
      category: "Men's Clothing",
      price: "₹599",
      sold: 145,
      stock: 230,
    },
    {
      id: "PROD-002",
      name: "Slim Fit Jeans",
      category: "Men's Clothing",
      price: "₹899",
      sold: 132,
      stock: 85,
    },
    {
      id: "PROD-003",
      name: "Floral Print Dress",
      category: "Women's Clothing",
      price: "₹1,299",
      sold: 128,
      stock: 62,
    },
    {
      id: "PROD-004",
      name: "Wireless Earbuds",
      category: "Electronics",
      price: "₹1,999",
      sold: 112,
      stock: 45,
    },
    {
      id: "PROD-005",
      name: "Kitchen Blender",
      category: "Home & Kitchen",
      price: "₹2,499",
      sold: 98,
      stock: 30,
    },
  ]

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Overview of your store's performance</p>
          </div>

          <div className="flex items-center gap-2">
            <Tabs defaultValue="7d" className="w-[300px]" onValueChange={setPeriod}>
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="7d">7 days</TabsTrigger>
                <TabsTrigger value="30d">30 days</TabsTrigger>
                <TabsTrigger value="90d">90 days</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium text-muted-foreground">{stat.title}</span>
                    <span className="text-2xl font-bold">{stat.value}</span>
                  </div>
                  <div
                    className={`p-2 rounded-full ${
                      stat.trend === "up" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                    }`}
                  >
                    <stat.icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <span className={`text-sm font-medium ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                    {stat.change}
                  </span>
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-4 w-4 text-green-600 ml-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-600 ml-1" />
                  )}
                  <span className="text-xs text-muted-foreground ml-1">vs previous {period}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="col-span-1">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest {recentOrders.length} orders from your store</CardDescription>
              </div>
              <Button variant="outline" asChild>
                <Link href="/admin/orders">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.amount}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`
                            ${order.status === "Delivered" && "border-green-600 text-green-600"}
                            ${order.status === "Processing" && "border-blue-600 text-blue-600"}
                            ${order.status === "Shipped" && "border-orange-600 text-orange-600"}
                            ${order.status === "Pending" && "border-yellow-600 text-yellow-600"}
                          `}
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Order</DropdownMenuItem>
                            <DropdownMenuItem>Update Status</DropdownMenuItem>
                            <DropdownMenuItem>Contact Customer</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Top Products</CardTitle>
                <CardDescription>Best selling products in your store</CardDescription>
              </div>
              <Button variant="outline" asChild>
                <Link href="/admin/products">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search products..." className="w-full pl-9" />
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Sold</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell>{product.sold}</TableCell>
                      <TableCell>
                        <span className={`${product.stock < 50 ? "text-red-600" : "text-green-600"}`}>
                          {product.stock}
                        </span>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit Product</DropdownMenuItem>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Update Stock</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>Monthly revenue for the current year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
              <BarChart3 className="h-16 w-16 text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">Chart will be displayed here</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

