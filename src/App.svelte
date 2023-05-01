<script lang="ts">
  import Fetcher from './lib/Fetcher.svelte'
  import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query'

  const queryClient = new QueryClient()
</script>

<QueryClientProvider client={queryClient}>
  <main>
    <Fetcher />
  </main>
</QueryClientProvider>
