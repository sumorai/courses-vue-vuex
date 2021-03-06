import Vue from 'vue'
import AuthorForm from '@/components/AuthorForm'
import TextInput from '@/components/common/TextInput'
import SelectInput from '@/components/common/SelectInput'
import {mount} from 'avoriaz'
import sinon from 'sinon'

// register global components
Vue.component('TextInput', TextInput);
Vue.component('SelectInput', SelectInput);


let onSave = sinon.stub();
let onDelete = sinon.stub();
let onChange = sinon.stub();

// component mocking function
function setup(saving, deleting) {
    const propsData = {
        author: {},
        saving: saving,
        deleting: deleting,
        errors: {},
        onSave: onSave,
        onDelete: onDelete,
        onChange: onChange
    };

    const vm = mount(AuthorForm, {
        propsData
    });

    return vm;
}

// actual tests
describe('AuthorForm.vue', () => {
    it('renders form and h1', () => {
        const vm = setup(false, false);
        expect(vm.find('form').length).to.equal(1);
        expect(vm.first('h1').text()).to.equal('Manage Author');
    });

    it('save button is labeled "Save" when not saving', () => {
        const vm = setup(false, false);
        expect(vm.first('input.saver').hasAttribute('value', 'Save')).to.equal(true);
    });

    it('save button is labeled "Saving..." when saving', () => {
        const vm = setup(true, false);
        expect(vm.first('input.saver').hasAttribute('value', 'Saving...')).to.equal(true);
    });

    it('delete button is labeled "Delete" when not deleting', () => {
        const vm = setup(false, false);
        expect(vm.first('input.deleter').hasAttribute('value', 'Delete')).to.equal(true);
    });

    it('delete button is labeled "Deleting..." when deleting', () => {
        const vm = setup(false, true);
        expect(vm.first('input.deleter').hasAttribute('value', 'Deleting...')).to.equal(true);
    });

    it('calls onSave handler when save button is clicked', () => {
        const vm = setup(false, true);
        vm.first('input.saver').trigger('click');
        expect(onSave.calledOnce).to.equal(true);
    });

    it('calls onDelete handler when delete button is clicked', () => {
        const vm = setup(false, true);
        vm.first('input.deleter').trigger('click');
        expect(onDelete.calledOnce).to.equal(true);
    });

    it('calls onChange handler when firstName field is changed', () => {
        const vm = setup(false, true);
        let input = vm.first('input[name=firstName]');
        input.element.value = 'mister';
        input.trigger('input');
        expect(onChange.calledOnce).to.equal(true);
    });
});

