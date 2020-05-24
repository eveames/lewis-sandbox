<template>
    <div>
        <div v-if="type === 'graduated cylinder'">
            <svg width="300" height="300">
                <path d="M30 10 L30 200 C 20 220, 80 220, 70 200 L70 40 Q70 25 80 20  C90 0 20 0 30 10 S 70 25 80 20 " stroke="black" fill="transparent"/>
                <ellipse cx="50" cy="215" rx="50" ry="20" stroke="black" fill="transparent"/>
            </svg>
        </div>
        
    </div>
</template>

<script>
export default {
    props: [
        'type',
        'data'
    ],

}
</script>