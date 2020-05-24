<template>
    <div>
        <svg width="300" height="300">
            <g v-show="analytical"><path d="M90 20 L210 20 L230 40 L70 40 L90 20 L90 160" stroke="black" fill="transparent"/>
                <path d="M210 20 L210 160" stroke="black" fill="transparent"/>
                <path d="M70 40 L 70 190" stroke="black" fill="transparent"/>
                <path d="M230 40 230 190" stroke="black" fill="transparent"/>
            </g>
            <path d="M90 160 L210 160 L230 190 L70 190 Z" stroke="black" fill="transparent"/>
            <path d="M70 190 L55 240 L70 240 L70 250 L100 250 L100 240  L200 240 L200 250 L230 250 L 230 240 L245 240 L230 190" stroke="black" fill="transparent"/>
            <ellipse cx="150" cy="170" rx="50" ry="10" stroke="black" fill="transparent"/>
            <ellipse cx="150" cy="175" rx="50" ry="10" stroke="black" fill="transparent"/>
            <rect x="90" y="200" width="100" height="25" stroke="black" fill="transparent"/>
            <rect @click="tare" x="200" y="203" rx="8" ry="8" width="25" height="20" stroke="black" fill="transparent"/>
            <text  x="202" y="216" font-size="8">TARE</text>
            <text x="180" y="216" font-size="14" text-anchor="end" font-family="sans-serif">{{displayMass}} g</text>
            <g v-show="boatOn"><path d="M130 170 L170 170 L180 155 L175 150 L 125 150 L120 155 Z" stroke="black" fill="white" /><path d="M120 155 L180 155" stroke="black" fill="black"/></g>
            <path v-show="sampleOn && sampleType === 'loose'" d="M130 170 L170 170 c10 -15 -50 -15  -40 0" fill="gray"/>
            <rect v-show="sampleOn && sampleType === 'solid'" x="115" y="160" width="60" height="12" fill="gray"/>
        </svg>
        <button @click="placeContainer">Put {{containerType}} on balance</button>
        <button @click="placeSample">Place sample on balance</button>
    </div>
</template>

<script>
import _ from 'lodash'
export default {
    props: [
        'analytical',
        'sampleType',
        'sampleMass',
        'containerType',
        'containerMass'
    ],
    data: function() {
        return {
            containerOn: false,
            sampleOn: false,
            tareMass: 0, 
            totalMass: 0,
            displayMass: 0
        }
    },
    computed: {
    },
    methods: {
        tare: function() {
            this.tareMass = this.totalMass
        },
        placeContainer: function() {
            this.totalMass += this.containerMass
            this.containerOn = true
        },
        placeSample: function() {
            this.totalMass += this.sampleMass
            this.sampleOn = true
        },
        randomize: function() {
            let randomFactor = 0
            let mass = this.totalMass - this.tareMass
            for (var i = 0; i < 6; i += 1) {
                randomFactor += Math.random();
                randomFactor /= 6
                randomFactor -= 0.5
            }         
            if (this.analytical) {
                randomFactor /= 100
                mass += randomFactor
                mass = _.round(mass, 3)
            }
            else {
                mass += randomFactor
                mass = _.round(mass, 1)
            }
            this.displayMass = mass
        }
    }
}
</script>