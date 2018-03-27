
<template>
    <yd-cell-group>
        
        <yd-cell-item arrow>
            <span slot="left">上门时间：</span>
            <yd-datetime type="datetime" v-model="datetime5" slot="right"></yd-datetime>
        </yd-cell-item>
        
    </yd-cell-group>
</template>

<script type="text/babel">
    export default {
        data() {
            return {
                
                datetime5: '2018-01-11 06:06',
                yearFormat: '<span style="color:#F00;">{value}<i style="font-size: 12px;margin-left: 1px;">年</i></span>',
                monthFormat: '<span style="color:#0BB20C;">{value}<i style="font-size: 12px;margin-left: 1px;">月</i></span>',
                dayFormat: '<span style="color:#FFB400;">{value}<i style="font-size: 12px;margin-left: 1px;">日</i></span>'
            }
        },
        watch:{
            'datetime5': {
                handler:(val, oldVal)=>{
                    console.log(this,'yueyang')
                    // this.$store.dispatch('changeAppointmentTime', val)
                }

            }
        }
    }
</script>