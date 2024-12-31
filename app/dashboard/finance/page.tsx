"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import axios from "axios";
import { apiUrl } from "@/apis/api";

interface transactions {
  finance_id: string;
  description: string;
  amount: string;
  type: string;
  category: string;
  status: string;
  date: string;
  invoice_id: string;
}

export default function FinancePage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    description: "",
    amount: "",
    category: "",
    type: "Income",
  });
  const [recentTransactions, setRecentTransactions] = useState<transactions[]>(
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTransaction((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (value: string) => {
    setNewTransaction((prev) => ({ ...prev, type: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${apiUrl}/api/create/transactions`,
        {
          description: newTransaction.description,
          amount: newTransaction.amount,
          type: newTransaction.type,
          category: newTransaction.category,
          status: "Completed", // Default status if you have no other logic
          date: new Date().toISOString(), // Current date and time
          invoice_id: "INV-" + Date.now(), // Generate an invoice ID (example)
        },
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
            "Content-Type": "application/json", // Add Content-Type
          },
        }
      );

      alert(response.data);

      // Reset form and close dialog
      setNewTransaction({
        description: "",
        amount: "",
        category: "",
        type: "Income",
      });
      setIsFormOpen(false);

      // Fetch updated transactions
      await GetTransaction();
    } catch (error) {
      console.error("Error adding transaction:", error);
      alert("Error adding transaction. Please try again.");
    }
  };

  async function GetTransaction() {
    const response = await axios.get(`${apiUrl}/api/get/transactions`, {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    });
    setRecentTransactions(response.data);
  }

  useEffect(() => {
    GetTransaction();
  }, []);

  // Financial calculation
  const calculateFinancialSummary = (transactions: transactions[]) => {
    let totalRevenue = 0;
    let totalExpenses = 0;
    let netProfit = 0;
    let pendingInvoicesAmount = 0;

    transactions.forEach((transaction) => {
      const { amount, type, status } = transaction;

      // Convert amount to number
      const amountValue = parseFloat(amount);

      // Calculate total revenue and expenses
      if (type === "Income") {
        totalRevenue += amountValue;
      } else if (type === "Expense") {
        totalExpenses += amountValue;
      }

      // Calculate pending invoices
      if (status === "Pending") {
        pendingInvoicesAmount += amountValue;
      }
    });

    // Calculate net profit
    netProfit = totalRevenue - totalExpenses;

    return {
      totalRevenue: totalRevenue,
      totalExpenses: totalExpenses,
      netProfit: netProfit,
      pendingInvoicesAmount: pendingInvoicesAmount,
    };
  };

  const { totalRevenue, totalExpenses, netProfit, pendingInvoicesAmount } =
    calculateFinancialSummary(recentTransactions);

  return (
    <div className="space-y-6 relative min-h-screen pb-16">
      <h1 className="text-2xl font-bold">Finance</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card key="Total Revenue">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalRevenue.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card key="Expenses">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalExpenses.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card key="Net Profit">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${netProfit.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card key="Pending Invoices">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Invoices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${pendingInvoicesAmount.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentTransactions.map((transaction) => (
              <TableRow key={transaction.finance_id}>
                <TableCell>{transaction.description}</TableCell>
                <TableCell
                  className={
                    transaction.amount.length > 0
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  ${Math.abs(parseInt(transaction.amount)).toLocaleString()}
                </TableCell>
                <TableCell>{transaction.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Button
        className="fixed bottom-4 right-4 rounded-full"
        size="lg"
        onClick={() => setIsFormOpen(true)}
      >
        <PlusCircle className="mr-2 h-4 w-4" /> Add New Transaction
      </Button>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent aria-describedby="new-transaction-description">
          <DialogHeader>
            <DialogTitle>Add New Transaction</DialogTitle>
          </DialogHeader>
          <DialogDescription id="new-transaction-description">
            Enter the details of the new transaction below.
          </DialogDescription>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  name="description"
                  value={newTransaction.description}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Amount
                </Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  value={newTransaction.amount}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Input
                  id="category"
                  name="category"
                  value={newTransaction.category}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select
                  onValueChange={handleTypeChange}
                  defaultValue={newTransaction.type}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select transaction type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Income">Income</SelectItem>
                    <SelectItem value="Expense">Expense</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Transaction</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
