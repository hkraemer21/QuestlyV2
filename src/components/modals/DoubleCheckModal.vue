<script>
import { Modal } from 'bootstrap';

export default {
    name: 'DoubleCheckModal',

    props: {
        title: { type: String, required: true },
        message: { type: String, required: true },
        confirmLabel: { type: String, default: 'Confirm' },
        cancelLabel: { type: String, default: 'Cancel' },
    },

    emits: ['confirm', 'cancel'],

    data() {
        return {
            bsModal: null,
            id: 'double-check-modal-' + crypto.randomUUID(),
        };
    },

    methods: {
        open() {
            if (!this.bsModal) return;
            this.bsModal.show();
        },

        close() {
            if (!this.bsModal) return;
            this.bsModal.hide();
        },

        confirm() {
            this.$emit('confirm');
            this.close();
        },

        cancel() {
            this.$emit('cancel');
            this.close();
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
        <div class="modal fade" ref="modal" tabindex="-1" role="dialog" :aria-labelledby="id + '-title'" :aria-describedby="id + '-message'">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content parchment-background rounded-0">
                    <div class="modal-header border-0 p-3 fw-bold">
                        <div class="w-100">
                            <h5 class="modal-title header text-center fw-bold" :id="id + '-title'">{{ title }}</h5>
                            <img src="../../images/game-divider.png" alt="" class="divider-img mb-3 d-block mx-auto">
                        </div>
                        <button type="button" class="btn-close position-absolute top-0 end-0 m-3" aria-label="Close" @click="cancel"></button>
                    </div>

                    <div class="modal-body p-3 text-center body" :id="id + '-message'">
                        <slot>
                            <p class="mb-0">{{ message }}</p>
                        </slot>
                    </div>

                    <div class="modal-footer border-0 p-3 d-flex justify-content-center gap-2">
                        <button type="button" class="btn submit-btn bg-danger" @click="confirm">{{ confirmLabel }}</button>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>