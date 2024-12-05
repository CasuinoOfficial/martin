import { Transaction } from "@mysten/sui/transactions";
import { martinSigner } from "./signer";
import { bcs } from "@mysten/sui/bcs";

export const SUI_COIN_TYPE = "0x2::sui::SUI";
export const SPRING_SUI_COIN_TYPE = '0x83556891f4a0f233ce7b05cfe7f957d4020492a34f5405b2cb9377d060bef4bf::spring_sui::SPRING_SUI';
export const BUCK_COIN_TYPE =
  "0xce7ff77a83ea0cb6fd39bd8748e2ec89a3f41e8efdc3f4eb123e0ca37b184db2::buck::BUCK";
export const FUD_COIN_TYPE =
  "0x76cb819b01abed502bee8a702b4c2d547532c12f25001c9dea795a5e631c26f1::fud::FUD";
export const LIQ_COIN_TYPE = "0x9c86d1926a0a39e906f20674d6a35f337be8625ebcb6b799ee8ff011f328bee2::liq::LIQ";
export const AAA_COIN_TYPE = "0xd976fda9a9786cda1a36dee360013d775a5e5f206f8e20f84fad3385e99eeb2d::aaa::AAA"
export const HSUI_COIN_TYPE = "0x8c47c0bde84b7056520a44f46c56383e714cc9b6a55e919d8736a34ec7ccb533::suicune::SUICUNE"
export const USDC_COIN_TYPE = "0xdba34672e30cb065b1f93e3ab55318768fd6fef66c15942c9f7cb846e2f900e7::usdc::USDC";
export const ALPHAFI_COIN_TYPE = "0xfe3afec26c59e874f3c1d60b8203cb3852d2bb2aa415df9548b8d688e6683f93::alpha::ALPHA";
export const SUITARDIO_TYPE = "0x862c5f46431d4be2fc3042f9ded715b019b95126006a99df80a0904ba1f0cbe6::suitardio::SUITARDIO";
export const DEEP_COIN_TYPE = "0xdeeb7a4662eec9f2f3def03fb937a663dddaa2e215b8078a284d026b7946c270::deep::DEEP";
export const UNI_COIN_TYPE = "0xaf9e228fd0292e2a27b4859bc57a2f3a9faedb9341b6307c84fef163e44790cc::uni::UNI";
export const DAM_COIN_TYPE = "0xaf3aae4940a248739ce4964857381fc3f3149a6d05375bfbb2118592907e3bbb::dam::DAM";
export const PUP_COIN_TYPE = "0x980ec1e7d5a3d11c95039cab901f02a044df2d82bc79d99b60455c02524fad83::pup::PUP";
export const OCTO_COIN_TYPE = "0x4b6d48afff2948c3ccc67191cf0ef175637472b007c1a8601fa18e16e236909c::octo::OCTO";
export const TUSK_COIN_TYPE = "0x1fc50c2a9edf1497011c793cb5c88fd5f257fd7009e85a489392f388b1118f82::tusk::TUSK";
export const TURBOS_COIN_TYPE = '0x57e93d9e28ce2303dc7838bb00b7f3f012a1856b3738e5a3ee252de265ff5ff6::turbo::TURBO';

export const getInputCoins = async (
    tx: Transaction,
    owner: string,
    coinType: string,
    amounts: number[],
  ) => {
    if (coinType === "0x2::sui::SUI") {
      return tx.splitCoins(
        tx.gas,
        amounts.map((amount) => tx.pure.u64(amount)),
      );
    }
    let targetCoinType = coinType;
    if (coinType.slice(0, 2) !== "0x") {
      targetCoinType = `0x${coinType}`;
    }
  
    const { data: userCoins } = await martinSigner.suiClient.getCoins({
      owner,
      coinType: targetCoinType,
    });
    const [mainCoin, ...otherCoins] = userCoins.map((coin) =>
      tx.objectRef({
        objectId: coin.coinObjectId,
        version: coin.version,
        digest: coin.digest,
      }),
    );
    if (!mainCoin) return undefined;
    if (otherCoins.length > 0) tx.mergeCoins(mainCoin, otherCoins);
  
    return tx.splitCoins(
      mainCoin,
      amounts.map((amount) => tx.pure.u64(amount)),
    );
  };

export const PARTNER_COINFLIP_PACKAGE_ID = "0xc7a14e8e58abc21100a5c218d4e4f89cf8f1ac1af7066b451dfb05f976002f15";
export const PARTNER_FLIP_GAME_TYPE = `${PARTNER_COINFLIP_PACKAGE_ID}::coinflip::Coinflip`;
  
const DOUBLEUP_CITIZEN_TYPE = '0x862810efecf0296db2e9df3e075a7af8034ba374e73ff1098e88cc4bb7c15437::doubleup_citizens::DoubleUpCitizen';
// Partner List
export const PARTNER_LIST_OBJECT = "0x360bfd4d00d6c49c3ca570a4256c1ed27c9c7997f2beba8b4d1d66f432deff76"

const CITIZENS_ID = [
    '0x24c386e18e8a099cefc5ae6659a1b4b8889b7b4b0a18742d739aac8a98b55ff5',
    '0x3da4e296d7cb18fe0d381ae5d2dfb849b919ac2c65c06cdf0fa9a3668272eea0',
    '0x43817a89c9064c57b998f7ac0ac447a7401d8835820a0a9f13e61d73d2d876e0',
    '0x7ec368049e6f92d267030943c5fcc383654764267e6f58b6fd5169daf88cf3e0',
    '0xbcbc6e406003afe00a699a38ba69bb6fbddd643ee94fdd355485a46babf9d18d',
    '0xe1acc737c4779a1af70100843128e56ba9931ff9fc42170eb672cc72c687e41b',
    '0xea42d04be43e5bdb4b48a8ffe2372cb3fd0f62f8c3e5e1bad3473a5ed5ba4331',
    '0xf07b06095dbb173d708c5d12d70565c4d2b6f959d62b864dccaa3bca8f6239e4',
    '0x306050fa13140262627e2a964f25326dec277242618a0a948a7c04c03eaa7419',
    '0xbfeb2049ea16e216a0b2addb0dd9cdd4126cc453266066b139b0a486662f30fe'
]

export const UNIHOUSE_PACKAGE_ID =
  "0xf74734a75a091c4edf70e4b80afa91a31be4b3169917168ce20f0cd6e6711f12";
export const UNIHOUSE_OBJECT_ID =
  "0x75c63644536b1a7155d20d62d9f88bf794dc847ea296288ddaf306aa320168ab";

const BASE_FLIP = 1_000_000_000;

async function coinflip(
    amount: number,
    coinType: string
): Promise<any> {
     let tx = new Transaction();
    let coin = await getInputCoins(
        tx, 
        martinSigner.getSuiAddress(), 
        coinType, 
        [amount]
    );
    let citizensId = CITIZENS_ID.map((id) => tx.object(id));

    let vector = tx.makeMoveVec({
        elements: citizensId,
        type: `${DOUBLEUP_CITIZEN_TYPE}`
    })

    tx.moveCall({
        target: `${PARTNER_COINFLIP_PACKAGE_ID}::coinflip::play_with_partners`,
        typeArguments: [coinType, DOUBLEUP_CITIZEN_TYPE],
        arguments: [
            tx.object(UNIHOUSE_OBJECT_ID),
            tx.object('0x8'),
            tx.pure(bcs.vector(bcs.U64).serialize([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])),
            coin,
            tx.object(PARTNER_LIST_OBJECT),
            vector,
            tx.pure.string("martin")
        ]
    });

  //   tx.moveCall({
  //     target: `${PARTNER_COINFLIP_PACKAGE_ID}::coinflip::play`,
  //     typeArguments: [coinType],
  //     arguments: [
  //         tx.object(UNIHOUSE_OBJECT_ID),
  //         tx.object('0x8'),
  //         tx.pure(bcs.vector(bcs.U64).serialize([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])),
  //         coin,
  //         tx.pure.string("martin")
  //     ]
  // });

    tx.setGasBudget(1_000_000_000);

    let resp = await martinSigner.signAndExecuteTransaction({
        transaction: tx,
        options: {
            showEvents: true,
            showBalanceChanges: true,
        }
    });
    console.log(resp);
    return resp.balanceChanges;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function main() {
    let previousAmount = 400;
    let tracker = 0;
    const SIX_DECIMALs = 1_000_000;
    const NINE_DECIMALs = 1_000_000_000;
    // await coinflip(320 * 1_000_000_000, ALPHAFI_COIN_TYPE)
    while(true) {
        let targetCoinType = USDC_COIN_TYPE;
        let resp = await coinflip(
            previousAmount * SIX_DECIMALs,
            targetCoinType
        );
        
        for (let item of resp) {
            if (item.coinType === targetCoinType) {
                tracker += Number(item.amount);
            }
        }

        console.log(tracker);

        await sleep(5000);
    };
}

main().catch((err) => console.log(err));