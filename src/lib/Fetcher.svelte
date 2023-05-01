<script lang="ts">
  import { createQuery } from '@tanstack/svelte-query'

  const endpoint = '/api/data'

  const query = createQuery<any, Error>({
    queryKey: ['refetch'],
    queryFn: async () => await fetch(endpoint).then((r) => r.json())
  })
</script>

<div class="bg-red-300">
  this is the fetcher component
  {#if $query.isLoading}
    Loading...
  {/if}
  {#if $query.error}
    An error has occurred:
    {$query.error.message}
  {/if}
  {#if $query.isSuccess}
    <div>
      <h1>{JSON.stringify($query.data)}</h1>
    </div>
  {/if}
</div>
