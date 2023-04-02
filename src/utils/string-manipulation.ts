export const formatAddress = (address: any) => {
    if (!address) return '';
    if (typeof address == 'object') {
      // assume this is a PublicKey
      address = address.toString();
    }
    return address.length > 10 ? `${address.substring(0, 4)}...${address.substring(address.length - 4, address.length)}` : address;
  }