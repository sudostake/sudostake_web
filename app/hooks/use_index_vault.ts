import { useMutation } from "@tanstack/react-query";

export const useIndexVault = (address: string) => {
    const indexVault = async () => {
        try {
            const response = await fetch("/api", {
                method: "POST",
                body: JSON.stringify({ address }),
            });

            const data = await response.json();
            console.log(data);
        } catch (e) {
            /* throw the error for the UI */
            console.log(e)
            throw e
        }
    }

    const mutation = useMutation(async () => {
        await indexVault();
    }, {});

    return mutation;
}