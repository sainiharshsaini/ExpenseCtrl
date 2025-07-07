"use client"

import React from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import Link from 'next/link';
import useFetch from '@/hooks/usefetch';
import { updateDefaultAccount } from '@/actions/accounts';
import { toast } from 'sonner';
import { useEffect } from 'react';

const UserBankAccountCard = ({ account }: any) => {
  const { name, type, balance, id, isDefault } = account;

  const {
    loading: updateDefaultLoading,
    fn: updateDefaultFn,
    data: updatedAccount,
    error,
  } = useFetch(updateDefaultAccount);

  const handleDefaultChange = async (e: any) => {
    e.preventDefault(); // Prevent navigation

    if (isDefault) {
      toast.warning("You need atleast 1 default account");
      return; // Don't allow toggling off the default account
    }

    await updateDefaultFn(id);
  };

  useEffect(() => {
    if (updatedAccount) {
      toast.success("Default account updated successfully");
    }
  }, [updatedAccount]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update default account");
    }
  }, [error]);
  
  return (
    <Card>
      <Link href={`/account/${id}`}>
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <Switch
            checked={isDefault}
            onClick={handleDefaultChange}
            disabled={updateDefaultLoading ?? undefined}
          />
        </CardHeader>
        <CardContent> 
          <div>
            ${parseFloat(balance).toFixed(2)}
          </div>
          <p>
            {type.charAt(0) + type.slice(1).toLowerCase()} Account
          </p>
        </CardContent>
        <CardFooter>
          <div>
            <ArrowUpRight />
            Income
          </div>
          <div>
            <ArrowDownRight />
            Expense
          </div>
        </CardFooter>
      </Link>
    </Card>
  )
}

export default UserBankAccountCard