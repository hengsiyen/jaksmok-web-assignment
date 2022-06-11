<template>
    <div class="d-flex justify-content-center align-items-center vh-65">
        <div>
            <h4>{{ error }}</h4>
            <p>{{ message }}</p>
        </div>

    </div>
</template>

<script>

export default {
    name: 'MessageError',
    props: {
        error: {
            type: String,
            default: ''
        },
        message: {
            type: String,
            default: ''
        }
    }
}
</script>