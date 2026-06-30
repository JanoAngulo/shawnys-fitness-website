<script setup lang="ts">
definePageMeta({ layout: false })
useSeoMeta({ title: "Log in — Shawny's Fitness" })

const form = reactive({ email: '', password: '' })
const show = ref(false)
const router = useRouter()

function submit() {
  if (!form.email || !form.password) return
  router.push('/dashboard')
}
</script>

<template>
  <AuthShell kicker="Member access" title="Welcome back.">
    <form @submit.prevent="submit">
      <div class="field">
        <label for="l-email">Email</label>
        <input id="l-email" v-model="form.email" class="input" type="email" required placeholder="you@email.com" autocomplete="email">
      </div>
      <div class="field">
        <label for="l-pass">Password</label>
        <div class="pass">
          <input
            id="l-pass"
            v-model="form.password"
            class="input"
            :type="show ? 'text' : 'password'"
            required
            placeholder="••••••••"
            autocomplete="current-password"
          >
          <button type="button" class="pass__toggle" :aria-label="show ? 'Hide password' : 'Show password'" @click="show = !show">
            <UIcon :name="show ? 'i-lucide-eye-off' : 'i-lucide-eye'" />
          </button>
        </div>
      </div>

      <div class="row">
        <label class="check"><input type="checkbox"> Remember me</label>
        <NuxtLink to="/login" class="link">Forgot password?</NuxtLink>
      </div>

      <button class="btn btn--block" type="submit">Log in</button>
    </form>

    <p class="alt">New here? <NuxtLink to="/signup" class="link">Join Now</NuxtLink></p>
  </AuthShell>
</template>

<style scoped>
.pass { position: relative; }
.pass__toggle { position: absolute; right: 0.5rem; top: 50%; transform: translateY(-50%); background: transparent; border: 0; color: var(--color-muted); cursor: pointer; padding: 0.5rem; font-size: 1.1rem; display: grid; place-items: center; }
.pass__toggle:hover { color: var(--color-accent); }
.row { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-block: 0.25rem 1.75rem; flex-wrap: wrap; }
.check { display: inline-flex; align-items: center; gap: 0.5rem; color: var(--color-muted); font-size: 0.9rem; cursor: pointer; }
.check input { accent-color: var(--color-accent); width: 1rem; height: 1rem; }
.link { color: var(--color-accent); font-size: 0.9rem; font-weight: 500; }
.link:hover { text-decoration: underline; }
.alt { margin-top: 1.75rem; color: var(--color-muted); text-align: center; }
</style>
