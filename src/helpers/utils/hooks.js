"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useFetch = (queryKey, fetchMethod, params = {}) => {
  const query = useQuery({
    queryKey: [queryKey, params],
    queryFn: () => fetchMethod(params),
    keepPreviousData: true,
    staleTime: 1000 * 60,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
};


export const useActionAsync = (actionMethod, queryKey = null) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload) => {
      return await actionMethod(payload);
    },
    onSuccess: () => {
      if (queryKey) queryClient.invalidateQueries([queryKey]);
    },
  });
  
  const mutateAsync = async (payload) => {
    return await mutation.mutateAsync(payload);
  };

  return { ...mutation, mutateAsync };
};
