import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { createApp } from "@/actions/app";
import { useToast } from "@/hooks/useToast";
import { useNewAppModal } from "./useNewAppModal";
import { CreateAppPayload } from "@/lib/validators/app";

type useCreateAppProps = {
    pushToNewAppUrl?: boolean
};

export const useCreateApp = (props?: useCreateAppProps) => {
    const router = useRouter();
    const { toast } = useToast();
    const { close } = useNewAppModal();
    const queryClient = useQueryClient();
    const [isLoading, startTransition] = useTransition();
    const pushToNewAppUrl =
        !props ||
        props.pushToNewAppUrl === undefined ? true : props.pushToNewAppUrl;

    const onSubmit = (payload: CreateAppPayload) => {
        startTransition(() => {
            createApp(payload).then((data) => {
                if (data.success) {
                    toast({
                        title: "Success",
                        description: data.success
                    });
                    queryClient.invalidateQueries({
                        queryKey: ["apps"]
                    });
                    queryClient.invalidateQueries({
                        queryKey: ["get-apps"]
                    });
                    if (pushToNewAppUrl) {
                        router.push(`/apps/${data.appId}`);
                    }
                    close();
                }
                if (data.error) {
                    toast({
                        title: "Error",
                        description: data.error
                    });
                }
            }).catch(() => {
                toast({
                    title: "Error",
                    description: "Something went wrong"
                });
            });
        });
    };

    return { isLoading, onSubmit };
};