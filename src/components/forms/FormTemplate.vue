<script>

export default {
    name: "FormTemplate",


};
</script>

<template>
    <div class="auth-page d-flex justify-content-center body">

        <div class="parchment-background w-100 mx-3 mx-md-0 p-4 authentication-form fw-bold">

            <slot name="form"></slot>

        </div>

    </div>
</template>
