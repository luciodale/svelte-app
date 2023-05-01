<script lang="ts">
  import Counter from './lib/Counter.svelte'
  import Fetcher from './lib/Fetcher.svelte'
  import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query'

  const queryClient = new QueryClient()
</script>

<QueryClientProvider client={queryClient}>
  <main>
    <Counter />
    <Fetcher />
  </main>
</QueryClientProvider>
