import Link from "next/link";
import { signOut } from "next-auth/react";
import { Dispatch, SetStateAction } from "react";

import {
    Button,
    buttonVariants
} from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useCurrentUser } from "@/hooks/useCurrentUser";

interface NavButtonsProps {
    className?: string;
    setIsOpen?: Dispatch<SetStateAction<boolean>>;
}

const NavButtons = ({
    className = "",
    setIsOpen
}: NavButtonsProps) => {
    const user = useCurrentUser();

    const closeSheet = () => {
        if (setIsOpen) {
            setIsOpen(false);
        }
    };

    return (
        <div className={className}>
            {user && user.id ? (
                <>
                    <Button
                        variant="outline"
                        onClick={() => signOut()}
                    >
                        Sign Out
                    </Button>
                    <Link href="/dashboard" className={cn(buttonVariants({
                        variant: "secondary"
                    }))} onClick={closeSheet}>
                        Dashboard
                    </Link>
                </>
            ) : (
                <Link href="/signin" className={cn(buttonVariants({
                    variant: "secondary"
                }))} onClick={closeSheet}>
                    Sign In
                </Link>
            )}
        </div>
    )
};

export default NavButtons;