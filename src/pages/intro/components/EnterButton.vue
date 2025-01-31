<template>
    <div class="enter-button-container">
        <v-btn
            size="x-large"
            to="/homepage"
            min-width="180"
            height="180"
            class="enter-button rounded-circle"
        >
            <div class="enter-button-content">
                <v-icon size="40" class="mb-2">mdi-arrow-right</v-icon>
                <span class="text-h6">进入项目</span>
            </div>
        </v-btn>
    </div>
</template>

<style scoped>
.enter-button-container {
    position: relative;
    width: 180px;
    height: 180px;
    flex-shrink: 0;
}

.enter-button {
    background: rgba(17, 34, 64, 0.6);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.5s ease;
    position: relative;
    overflow: hidden;
}

.enter-button::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.5s ease, height 0.5s ease;
}

.enter-button:hover::before {
    width: 200%;
    height: 200%;
}

.enter-button-content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
}

.enter-button:hover {
    transform: scale(1.1);
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
}

.enter-button:hover .enter-button-content {
    animation: pulse 1.5s infinite;
}

@keyframes pulse {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(1);
    }
}
</style>
