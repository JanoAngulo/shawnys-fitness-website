<template>
  <div>
    <NuxtRouteAnnouncer />
    <ClientOnly>
      <AppLoader />
    </ClientOnly>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
