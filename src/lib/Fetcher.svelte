<script lang="ts">
  import { createMutation, createQuery, useQueryClient } from '@tanstack/svelte-query'

  const endpoint = '/api/data'
  let text: string

  const client = useQueryClient()

  const query = createQuery<string[], Error>({
    queryKey: ['data'],
    queryFn: async () => await fetch(endpoint).then((r) => r.json())
  })

  const createTodo = async (text: string): Promise<string> =>
    await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
      }),
    }).then((res) => res.json())


  const addTodoMutation = createMutation(createTodo, {
    // When mutate is called:
    onMutate: async (newTodo: string) => {
      text = ''
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await client.cancelQueries(['data'])

      // Snapshot the previous value
      const previousTodos = client.getQueryData<string[]>(['data'])
      // Optimistically update to the new value
      if (previousTodos) {
        client.setQueryData<string[]>(['data'], [...previousTodos, newTodo])
      }

      return { previousTodos }
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err: Error, variables, context) => {
      if (context?.previousTodos) {
        client.setQueryData<string[]>(['data'], context.previousTodos)
      }
    },
    // Always refetch after error or success:
    onSettled: () => {
      client.invalidateQueries(['data'])
    },
  })
</script>

<form
  on:submit={(e) => {
    e.preventDefault()
    e.stopPropagation()
    $addTodoMutation.mutateAsync(text)
  }}
>
  <div>
    <input type="text" bind:value={text} />
    {console.log($addTodoMutation)}
    <button disabled={$addTodoMutation.isLoading && !$addTodoMutation.isPaused}>Create</button>
  </div>
</form>

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
