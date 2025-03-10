<script setup>
const reviews = [
  {
    id: 1,
    content: "This IT equipment management system has transformed how we handle our assets. The tracking and maintenance features are invaluable.",
    author: "Sarah Johnson",
    role: "IT Director",
    company: "Tech Solutions Inc.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    id: 2,
    content: "The dashboard provides clear insights into our equipment status. It's helped us optimize our resource allocation significantly.",
    author: "Michael Chen",
    role: "Operations Manager",
    company: "Global Systems Ltd.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    id: 3,
    content: "Maintenance scheduling has never been easier. We've reduced equipment downtime by 40% since implementing this system.",
    author: "Emily Rodriguez",
    role: "IT Infrastructure Lead",
    company: "Innovative Corp",
    rating: 5,
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  }
];
</script>

<template>
  <div class="bg-gray-50 py-16 sm:py-24">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Trusted by Industry Leaders
        </h2>
        <p class="mt-4 text-lg leading-8 text-gray-600">
          See what our clients say about their experience with our IT equipment management solution.
        </p>
      </div>
      <div class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        <div v-for="review in reviews" :key="review.id" class="flex flex-col bg-white ring-1 ring-gray-200 rounded-2xl p-8 transform transition duration-500 hover:scale-105">
          <div class="flex items-center gap-x-4 mb-4">
            <img :src="review.image" alt="" class="h-12 w-12 rounded-full bg-gray-50">
            <div>
              <h3 class="font-semibold text-gray-900">{{ review.author }}</h3>
              <p class="text-sm leading-6 text-gray-600">{{ review.role }}</p>
            </div>
          </div>
          <div class="flex items-center mb-4">
            <div class="flex items-center">
              <template v-for="star in review.rating" :key="star">
                <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </template>
            </div>
          </div>
          <blockquote class="text-sm leading-6 text-gray-600 flex-grow">
            "{{ review.content }}"
          </blockquote>
          <p class="mt-4 text-sm text-gray-600">{{ review.company }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
