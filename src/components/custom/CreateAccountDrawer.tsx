"use client"

import React, { useState } from 'react'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { useForm, SubmitHandler } from "react-hook-form"
import { accountSchema } from '@/lib/validators/formSchema'
import { zodResolver } from '@hookform/resolvers/zod';

const CreateAccountDrawer = ({ children }: any) => {
    const [open, setOpen] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        reset,
    } = useForm({
        resolver: zodResolver(accountSchema),
        defaultValues: {
            name: "",
            type: "CURRENT",
            balance: "",
            isDefault: false,
        },
    });

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>{children}</DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                </DrawerHeader>
                <div>
                    <form action="">

                    </form>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default CreateAccountDrawer