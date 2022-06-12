import { FactStore } from "./fact-store.js";

const runFactEngine = () => {
    const factStore = new FactStore();
    factStore.addFact('is_a_cat', ['lucy']);
    factStore.query('is_a_cat', ['lucy']);
    factStore.query('is_a_cat', ['X']);
    factStore.query('is_a_cat', ['spot']);
    factStore.addFact('likes', ['meg', 'lattes']);
    factStore.addFact('likes', ['meg', 'bicycles']);
    factStore.query('likes', ['X', 'bicycles']);
    factStore.addFact('make_a_triple', [3, 4, 5]);
    factStore.query('make_a_triple', ['X', 'X', 'Y']);
    factStore.query('make_a_triple', ['X', 4, 'Y']);
}

runFactEngine();