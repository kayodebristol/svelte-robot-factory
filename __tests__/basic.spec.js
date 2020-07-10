import useMachine from '../src/index';
import { isExportDeclaration } from 'typescript'; 

const { testPathIgnorePatterns } = require("../jest.config")



describe("basic test"), () => {
    test("useMachine is available", ()=>{
        expect(typeof useMachine).toBeTruthy();
    }); 
}; 