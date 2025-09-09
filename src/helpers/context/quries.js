"use client"

import {
  QueryClient,
  QueryClientProvider,
  onlineManager,
  // Hydrate
} from "@tanstack/react-query"

import { useState, useEffect } from "react"
import { persistQueryClient } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'

export default function ReactQueryProvider({ children}) {
  const [queryClient] = useState(() =>
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnReconnect: true,
        },
      },
    })
  )

  useEffect(() => {
    if (typeof window !== "undefined") {
      // online/offline status
      window.addEventListener("online", () => onlineManager.setOnline(true))
      window.addEventListener("offline", () => onlineManager.setOnline(false))

      // persist with localStorage
      const localStoragePersister = createSyncStoragePersister({
        storage: window.localStorage,
      })

      persistQueryClient({
        queryClient,
        persister: localStoragePersister,
        maxAge: 1000 * 60 * 60 * 24, // 1 day
      })
    }
  }, [queryClient])

  return (
    <QueryClientProvider client={queryClient}>
     {children}
    </QueryClientProvider>
  )
}
