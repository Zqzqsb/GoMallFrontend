<template>
    <div class="animated-background">
        <div class="gradient-overlay"></div>
        <div class="pattern-overlay"></div>
    </div>
</template>

<style scoped>
.animated-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
}

.gradient-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #1a365d 0%, #2d5a9e 100%);
    opacity: 0.9;
}

.pattern-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: 
        linear-gradient(45deg, rgba(255,255,255,0.03) 25%, transparent 25%),
        linear-gradient(-45deg, rgba(255,255,255,0.03) 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.03) 75%),
        linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.03) 75%);
    background-size: 20px 20px;
    animation: patternMove 20s linear infinite;
}

@keyframes patternMove {
    0% {
        background-position: 0 0;
    }
    100% {
        background-position: 40px 40px;
    }
}
</style>
