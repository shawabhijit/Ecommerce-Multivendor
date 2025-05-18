import { DollarSign } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../Components/ui/dialog';
import { Button } from '../../Components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../Components/ui/form';
import { Input } from '../../Components/ui/input';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "motion/react";

const formSchema = z.object({
    amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: "Please enter a valid amount greater than 0",
    }),
    bankAccount: z.string().min(1, "Bank account is required"),
});

interface RequestPayoutDialogProps {
    availableBalance: number;
    openRequestPayout: boolean;
    setOpenRequestPayout: React.Dispatch<React.SetStateAction<boolean>>;
}

const RequestPayoutDialog = ({ availableBalance, openRequestPayout, setOpenRequestPayout }: RequestPayoutDialogProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            amount: availableBalance.toString(),
            bankAccount: "",
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        // Here you would typically make an API call to process the payout
        console.log("Payout request submitted:", values);
    };

    return (
        <motion.div
            transition={{
                duration: 4,
                delay: 1
            }}
        >
            <Dialog open={openRequestPayout} onOpenChange={setOpenRequestPayout}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-[#1A1F2C]">
                            <DollarSign className="w-5 h-5 text-[#7E69AB]" />
                            Request Payout
                        </DialogTitle>
                        <DialogDescription>
                            Enter the amount you'd like to withdraw and verify your bank details.
                        </DialogDescription>
                    </DialogHeader>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Amount (Maximum: ${availableBalance})</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                                                <Input
                                                    {...field}
                                                    className="pl-7"
                                                    max={availableBalance}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="bankAccount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Bank Account</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Enter your bank account number" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <DialogFooter className="mt-6 flex gap-26">
                                <div>
                                    <Button onClick={() => setOpenRequestPayout(false)} type="button" className="w-[100px] bg-[#1e1d1f] hover:bg-[#f8f8f8] text-white hover:text-black transition-colors duration-500 cursor-pointer">
                                        Close
                                    </Button>
                                </div>
                                <Button type="submit" className=" bg-[#7E69AB] hover:bg-[#6E59A5] text-white cursor-pointer">
                                    Submit Payout Request
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>

            </Dialog>

        </motion.div>
    );
};

export default RequestPayoutDialog;