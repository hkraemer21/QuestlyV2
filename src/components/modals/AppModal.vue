<script>
import { Modal } from 'bootstrap';

export default {
    name: "AppModal",

    data: function () {
        return {
            bsModal: null,
            id: 'modal' + crypto.randomUUID(), 
            
        };
    },

    props: {
        title: { type: String, required: true },

    },

    emits: ['submit'],

    methods: {
        open() {
            if (!this.bsModal) return;
            this.bsModal.show();
        },
        close() {
            if (!this.bsModal) return;
            this.bsModal.hide();
        },

    },

    mounted() {
        if (this.$refs.modal) {
            this.bsModal = Modal.getOrCreateInstance(this.$refs.modal);
            
            this.$refs.modal.addEventListener('hide.bs.modal', () => {
                const activeElement = document.activeElement;
                if (activeElement && this.$refs.modal.contains(activeElement)) {
                    activeElement.blur();
                }
            });
        }
    },

    beforeUnmount() {
        if (this.bsModal) {
            this.bsModal.dispose();
            this.bsModal = null;
        }
    },

};




</script>


<template>

    <teleport to="body">
        <div class="modal fade" ref="modal" tabindex="-1" role="dialog" :aria-labelledby="id + 'modalTitle'">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <form @submit.prevent="$emit('submit')">
                    <div class="modal-content parchment-background rounded-0">
                        <div class="modal-header border-0 p-3 fw-bold">
                            <slot name="header">
                                <div class="w-100">
                                    <h5 class="modal-title header text-center" :id="id + 'modalTitle'">{{ title }}</h5>
                                    <img src="../../images/game-divider.png" alt="" class="divider-img mb-3 d-block mx-auto">
                                </div>
                                <button type="button" class="btn-close position-absolute top-0 end-0 m-3" data-bs-dismiss="modal" aria-label="Close"></button>
                            </slot>
                        </div>
                        <div class="modal-body p-3">
                            <slot></slot>
                        </div>
                        <div class="modal-footer border-0 p-3 d-flex justify-content-center gap-2">
                            <slot name="footer">
                                <button type="submit" class="btn submit-btn">Submit</button>
                            </slot>                                
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </teleport>


</template>