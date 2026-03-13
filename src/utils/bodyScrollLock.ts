const activeLocks = new Set<string>();

const syncBodyScroll = () => {
  document.body.style.overflow = activeLocks.size ? 'hidden' : '';
};

export const lockBodyScroll = (source: string) => {
  activeLocks.add(source);
  syncBodyScroll();
};

export const unlockBodyScroll = (source: string) => {
  activeLocks.delete(source);
  syncBodyScroll();
};
