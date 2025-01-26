// 15 min to complete with toddler in background running around
const is_open = (angle) => angle === '<';

const solution = (angles) => {

    let open = 0;
    let closed = 0;
    let first_angles = '';
    let last_angles = '';

    // balance closed with first angles, let opens run for last angles cleanup
    angles.split('').forEach((angle, index) => {
        is_open(angle) ? open++: closed++;
        if (closed > open) {
            first_angles += '<';
            closed--;
        }
    });

    const total_missing = open - closed;
    const missing_angle = total_missing > 0 ? '>': '<';
    // balance what should be list of missing closed angles
    for (let c = 0; c < Math.abs(total_missing); c++) {
        last_angles += missing_angle;
    }

    return `${first_angles}${angles}${last_angles}`;
};
//
// TEST CASE RESULT: ObjectrunCodeRequestId: "10834717"testCaseAnswer: {testCase: {…}, status: 'PASSED', actual: '"<>"', stderr: '', stdout: '', …}testCaseIndex: 0[[Prototype]]: Object
// fs.js:3 [Pusher] test-case-result: {"runCodeRequestId":"10834717","testCaseAnswer":{"testCase":{"name":"Test Case 0","expected":"\"<>\"","hidden":null,"halfHidden":null,"arguments":[{"argName":"angles","argValue":"\">\""}]},"status":"PASSED","actual":"\"<>\"","stderr":"","stdout":"","runtime":0},"testCaseIndex":0}
// fs.js:3 TEST CASE RESULT: Object
// fs.js:3 [Pusher] test-case-result: {"runCodeRequestId":"10834717","testCaseAnswer":{"testCase":{"name":"Test Case 1","expected":"\"<><>\"","hidden":null,"halfHidden":null,"arguments":[{"argName":"angles","argValue":"\"><\""}]},"status":"PASSED","actual":"\"<><>\"","stderr":"","stdout":"","runtime":0},"testCaseIndex":1}
// fs.js:3 TEST CASE RESULT: Object
// fs.js:3 [Pusher] test-case-result: {"runCodeRequestId":"10834717","testCaseAnswer":{"testCase":{"name":"Test Case 2","expected":"\"<<>>\"","hidden":null,"halfHidden":null,"arguments":[{"argName":"angles","argValue":"\">>\""}]},"status":"PASSED","actual":"\"<<>>\"","stderr":"","stdout":"","runtime":0},"testCaseIndex":2}
// fs.js:3 TEST CASE RESULT: Object
// fs.js:3 [Pusher] test-case-result: {"runCodeRequestId":"10834717","testCaseAnswer":{"testCase":{"name":"Test Case 3","expected":"\"<>\"","hidden":null,"halfHidden":null,"arguments":[{"argName":"angles","argValue":"\"<\""}]},"status":"PASSED","actual":"\"<>\"","stderr":"","stdout":"","runtime":1},"testCaseIndex":3}
// fs.js:3 TEST CASE RESULT: Object
// fs.js:3 [Pusher] test-case-result: {"runCodeRequestId":"10834717","testCaseAnswer":{"testCase":{"name":"Test Case 4","expected":"\"\"","hidden":null,"halfHidden":null,"arguments":[{"argName":"angles","argValue":"\"\""}]},"status":"PASSED","actual":"\"\"","stderr":"","stdout":"","runtime":0},"testCaseIndex":4}
// fs.js:3 TEST CASE RESULT: Object
// fs.js:3 [Pusher] test-case-result: {"runCodeRequestId":"10834717","testCaseAnswer":{"testCase":{"name":"Test Case 5","expected":"\"<<<<<>>>>><<<>>>\"","hidden":null,"halfHidden":null,"arguments":[{"argName":"angles","argValue":"\"<<>>>>><<<>>\""}]},"status":"PASSED","actual":"\"<<<<<>>>>><<<>>>\"","stderr":"","stdout":"","runtime":0},"testCaseIndex":5}
// fs.js:3 TEST CASE RESULT: Object
// fs.js:3 [Pusher] test-case-result: {"runCodeRequestId":"10834717","testCaseAnswer":{"testCase":{"name":"Test Case 6","expected":"\"<<>>\"","hidden":null,"halfHidden":null,"arguments":[{"argName":"angles","argValue":"\"<<\""}]},"status":"PASSED","actual":"\"<<>>\"","stderr":"","stdout":"","runtime":0},"testCaseIndex":6}
// fs.js:3 TEST CASE RESULT: Object
// fs.js:3 [Pusher] test-case-result: {"runCodeRequestId":"10834717","testCaseAnswer":{"testCase":{"name":"Test Case 7","expected":"\"<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>><<>>><>><><><>>><>>><<<>><<>><><>><><<<><<<>><>>><>><<<<><><>><>><><<><<><><><<><><<><>><>>>><>><<><><>><><><><<<<>><<><>>><<>><<>><>><<<>>>>><<<<>><<<>>><<<<<<><><>>>><>>>>><><>><><<><>>...","hidden":null,"halfHidden":null,"arguments":[{"argName":"angles","argValue":"\"<>><<>>><>><><><>>><>>><<<>><<>><><>><><<<><<<>><>>><>><<<<><><>><>><><<><<><><><<><><<><>><>>>><>><<><><>><><><><<<<>><<><>>><<>><<>><>><<<>>>>><<<<>><<<>>><<<<<<><><>>>><>>>>><><>><><<><>>>>>>>><<>>><>><><<<<<<><><<><<><<<><><<>><<<<<><><><<<<>><>..."}]},"status":"PASSED","actual":"\"<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>><<>>><>><><><>>><>>><<<>><<>><><>><><<<><<<>><>>><>><<<<><><>><>><><<><<><><><<><><<><>><>>>><>><<><><>><><><><<<<>><<><>>><<>><<>><>><<<>>>>><<<<>><<<>>><<<<<<><><>>>><>>>>><><>><><<><>>...","stderr":"","stdout":"","runtime":12},"testCaseIndex":7}
// fs.js:3 TEST CASE RESULT: Object
// fs.js:3 [Pusher] test-case-result: {"runCodeRequestId":"10834717","testCaseAnswer":{"testCase":{"name":"Test Case 8","expected":"\"<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<><>><><>><<><>>>><>><>>><><><><><>>><<>>><<<>>>><<>><><>><><>>><<>><><>>>>><<>>>><<<<><>><<>>>>>>><>>><<<<<>>>><<<<<<><>>>>>><><<<<><<>>><>><><>>>><<>><<>><<<<><>>>><>><<<<>>><<><<<<><><>>><>>>><><<><<><>>...","hidden":null,"halfHidden":null,"arguments":[{"argName":"angles","argValue":"\"><>><><>><<><>>>><>><>>><><><><><>>><<>>><<<>>>><<>><><>><><>>><<>><><>>>>><<>>>><<<<><>><<>>>>>>><>>><<<<<>>>><<<<<<><>>>>>><><<<<><<>>><>><><>>>><<>><<>><<<<><>>>><>><<<<>>><<><<<<><><>>><>>>><><<><<><>><><><<>><<>><<>><>>><<>>>><><>>><<<<<>><>><>..."}]},"status":"PASSED","actual":"\"<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<><>><><>><<><>>>><>><>>><><><><><>>><<>>><<<>>>><<>><><>><><>>><<>><><>>>>><<>>>><<<<><>><<>>>>>>><>>><<<<<>>>><<<<<<><>>>>>><><<<<><<>>><>><><>>>><<>><<>><<<<><>>>><>><<<<>>><<><<<<><><>>><>>>><><<><<><>>...","stderr":"","stdout":"","runtime":0},"testCaseIndex":8}
// fs.js:3 TEST CASE RESULT: Object
// fs.js:3 [Pusher] test-case-result: {"runCodeRequestId":"10834717","testCaseAnswer":{"testCase":{"name":"Test Case 9","expected":"\"<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<><><<>><>>>><>>>>>><<<<>><>>><>><><>>>>><>>>>><>><<><>...","hidden":null,"halfHidden":null,"arguments":[{"argName":"angles","argValue":"\"><><<>><>>>><>>>>>><<<<>><>>><>><><>>>>><>>>>><>><<><><<>>>><>>><>>><<>>>><<<>><<<>><<<<<<<>>>><>>>>><<<<<<>>>><<>>>>>>><><<>>>><>>>><>><><<<>>>><<<>>>><>><><<<><<<<<<>><<><><<><><<<><>><>><<<>><><<<<<>><<<><>>>><><>>>>><<><<><><><>><>>>>>>>><<<<><>..."}]},"status":"PASSED","actual":"\"<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<><><<>><>>>><>>>>>><<<<>><>>><>><><>>>>><>>>>><>><<><>...","stderr":"","stdout":"","runtime":3},"testCaseIndex":9}
