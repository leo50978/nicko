export default class SalarySectionComponent {
  constructor(rootId) {
    this.root = document.getElementById(rootId);

    if (!this.root) {
      console.error(`Salary root introuvable: ${rootId}`);
      return;
    }

    this.render();
  }

  render() {
    const cards = [
      {
        image: "https://images.unsplash.com/photo-1621525861277-20f9f95565ab?auto=format&fit=crop&w=900&q=80",
        label: "Personal-EUR",
        amount: "€3.126",
        txnTitle: "Coffee in Paris",
        txnTime: "Yesterday, 09:02",
        txnAmount: "-€3.25",
      },
      {
        image: "https://images.unsplash.com/photo-1557053910-d9eadeed1c58?auto=format&fit=crop&w=900&q=80",
        label: "Personal",
        amount: "£6,012",
        txnTitle: "Salary",
        txnTime: "Today, 11:28",
        txnAmount: "+£2,550",
      },
      {
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80",
        label: "Personal",
        amount: "£2,350",
        txnTitle: "House bills",
        txnTime: "Due today",
        txnAmount: "-£225",
      },
    ];

    const cardsHtml = cards
      .map(
        (card) => `
          <article class="relative h-[275px] w-[164px] overflow-hidden rounded-[8px] bg-black shadow-[0_14px_30px_rgba(0,0,0,0.18)] md:h-[392px] md:w-[234px]">
            <img src="${card.image}" alt="${card.txnTitle}" class="h-full w-full object-cover object-center" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10"></div>

            <div class="absolute inset-x-0 top-[38%] -translate-y-1/2 text-center text-white md:top-[41%]">
              <p class="ui-card-overline font-medium text-white/80">${card.label}</p>
              <p class="ui-card-amount mt-1 font-semibold">${card.amount}</p>
              <span class="ui-badge mt-2 inline-flex rounded-full bg-white px-3 py-1 font-semibold text-[#1f1f1f]">Accounts</span>
            </div>

            <div class="absolute inset-x-[6px] bottom-[6px] flex items-center justify-between rounded-[10px] bg-white px-[9px] py-[8px] md:inset-x-2 md:bottom-2 md:rounded-[13px] md:px-[10px] md:py-[8px]">
              <div class="flex items-center gap-[6px] md:gap-2">
                <div class="flex h-[20px] w-[20px] items-center justify-center rounded-full bg-[#5f69f3] text-[9px] text-white md:h-[22px] md:w-[22px] md:text-[10px]">
                  <i class="fa-solid fa-coins"></i>
                </div>
                <div class="text-[#3a3a3a]">
                  <p class="ui-card-meta font-semibold leading-none">${card.txnTitle}</p>
                  <p class="ui-card-submeta mt-[2px] font-medium text-[#667281]">${card.txnTime}</p>
                </div>
              </div>
              <p class="ui-card-meta font-semibold text-[#5b5b5b]">${card.txnAmount}</p>
            </div>
          </article>
        `
      )
      .join("");

    this.root.innerHTML = `
      <section class="bg-[#ebebeb] py-16 md:py-20">
        <div class="mx-auto w-full max-w-[960px] px-4 md:px-8">
          <header class="mx-auto max-w-[840px] text-center">
            <h2 class="ui-section-title font-semibold text-[#171b23]">
              Your salary, reimagined
            </h2>
            <p class="ui-section-lead mx-auto mt-6 max-w-[820px] font-semibold text-[#171b23]">
              Spend smartly, send quickly, sort your salary automatically, and watch your savings grow - all with Revolut.
            </p>
            <button
              type="button"
              class="ui-pill-button mt-8 bg-[#171b23] font-semibold text-white transition hover:bg-black"
            >
              Move your salary
            </button>
          </header>

          <div class="mt-12 flex flex-wrap items-center justify-center gap-3 md:mt-14 md:gap-4">
            ${cardsHtml}
          </div>
        </div>
      </section>
    `;
  }
}
