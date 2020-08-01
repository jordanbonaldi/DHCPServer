let _uuid = '';
const setUUID = (uuid) => _uuid = uuid;

const getUUID = () => _uuid;

module.exports  = {setUUID, getUUID};