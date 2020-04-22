
window.UTPackEntity = function(t) {
    function UTPackEntity(e) {
       var i = t.call(this) || this;
       return i.assetId = e.assetId,
       i.bronzeQuantity = e.packContentInfo ? e.packContentInfo.bronzeQuantity : 0,
       i.dealType = e.dealType,
       i.displayGroup = e.displayGroup.value,
       i.displayGroupAssetId = e.displayGroupAssetId,
       i.displayGroupDesc = "FUT_STORE_CAT_" + e.displayGroup.value.toString().toUpperCase() + "_DESC",
       i.displayGroupName = "FUT_STORE_CAT_" + e.displayGroup.value.toString().toUpperCase() + "_NAME",
       i.end = e.end || 0,
       i.goldQuantity = e.packContentInfo ? e.packContentInfo.goldQuantity : 0,
       i.guidAssetId = e.guidAssetId || "",
       i.id = e.id,
       i.isFifaPointsPack = e.packType === PurchasePackTypeEnum.POINTSPACK,
       i.isKitPack = e.displayGroup.value === PurchaseDisplayGroupEnum.KITS,
       i.isLimited = e.saleType === PurchaseSaleTypeEnum.QUANTITY || e.saleType === PurchaseSaleTypeEnum.TIME_QUANTITY,
       i.isMyPack = e.displayGroup.value === PurchaseDisplayGroupEnum.MYPACKS,
       i.isSpecialPack = e.displayGroup.value === PurchaseDisplayGroupEnum.SPECIAL,
       i.isTimed = e.saleType === PurchaseSaleTypeEnum.TIME || e.saleType === PurchaseSaleTypeEnum.TIME_QUANTITY,
       i.itemQuantity = e.packContentInfo ? e.packContentInfo.itemQuantity : 0,
       i.odds = e.packOdds ? e.packOdds.map(function(e) {
        return new UTPackOddsDTO(e)
    }, i).sort(function(e, t) {
        return e.order - t.order
    }) : [],
    i.packDesc = "FUT_STORE_PACK_" + e.id.toString() + "_DESC",
    i.packName = "FUT_STORE_PACK_" + e.id.toString() + "_NAME_MOBILE",
    i.packType = e.packType,
    i.points = e.points || 0,
    i.prices = new UTHashTable,
    i.quantity = e.quantity || 0,
    i.rareQuantity = e.packContentInfo ? e.packContentInfo.rareQuantity : 0,
    i.saleType = e.saleType,
    i.silverQuantity = e.packContentInfo ? e.packContentInfo.silverQuantity : 0,
    i.start = e.start || 0,
    i.state = e.state,
    i.purchaseCount = e.purchaseCount,
    i.storeId = e.firstPartyStoreId || 0,
    e.extPrice ? i.mtxGroupName = e.extPrice.finalPrice ? e.extPrice.finalPrice.groupName : e.extPrice.originalPrice.groupName : i.mtxGroupName = "",
    i.isFifaPointsPack && e.extPrice ? i.productId = e.extPrice.finalPrice ? e.extPrice.finalPrice.productId : e.extPrice.originalPrice.productId : i.productId = e.productId,
    Array.isArray(e.currencies) && e.currencies.forEach(function(e) {
        var t = new UTCurrencyVO(e.name,e.funds);
        i.prices.set(t.type, t)
    }),
    i
}
return __extends(UTPackEntity, t),
UTPackEntity.prototype.getPrice = function(e) {
    var t = this.prices.get(e);
    return t ? t.amount : 0
}
,
UTPackEntity.prototype.hasOdds = function() {
    return 0 < this.odds.length
}
,
UTPackEntity
}(UTObject)

window._0x2d5402 = function(){}
window._0x249037 = function(){}
if(typeof UTSBCHubView !== 'undefined'){
    UTSBCHubView.prototype.populateTiles = function populateTiles(e, t) {
        DOMKit.empty(this.__sbcSetTiles),
        this.clearTiles(),
        e = e.filter(function(e) {
            return e.isDisplayable()
        }),
        utils.JS.isValid(t) && DOMKit.toggleDisplayStyle(this.__favoritesTile, 0 === e.length && t.type === enums.SBC.CATEGORY_TYPE.CUSTOM_FAVOURITE),
        e.forEach(function _generateTile(e) {
            var t = new UTSBCSetTileView;
            t.init(),
            t.__root.id = e.id,
            t.setTitle(e.name),
            t.setData(e),
            t.addTarget(this, this._eTileSelected, enums.Event.TAP),
            t.addTarget(this, this._eTilePreviewSelected, UTSBCSetTileView.Event.PREVIEW_SELECTED),
            this._sbcSetTiles.push(t),
            this.__sbcSetTiles.appendChild(t.getRootElement()),
            t.render()
        }, this),
        DOMKit.toggleClass(this.getRootElement(), "single-set", e.length <= 1)
    }
}
if(typeof UTSBCHubView !== 'undefined'){
    UTStoreView.prototype._generatePack = function _generatePack(e, t, i, s) {
        var o = new UTStorePackDetailsView
        , n = e.getPrice(enums.Currency.COINS)
        , a = e.getPrice(enums.Currency.POINTS);
        o.init(),
        o.__root.id = e.id,
        o.setPackId(e.id),
        o.setPackBackground(e.assetId, e.guidAssetId),
        o.setPackForeground(e.assetId),
        o.setPromo(e.dealType, e.isLimited),
        o.setName(services.Localization.localize(e.packName)),
        o.setDescription(services.Localization.localize(e.packDesc)),
        o.setPackQuantity(e.quantity),
        o.setItemCounts(e.itemQuantity, e.bronzeQuantity, e.silverQuantity, e.goldQuantity, e.rareQuantity),
        o.setTimeRemaining(e.end),
        o.setCoinsAmount(n),
        o.setPointsAmount(a),
        o.toggleOdds(s),
        o.setMyPack(e.isMyPack),
        e.isMyPack || (o.toggleCoins(i.coins && 0 < n),
            o.togglePoints(i.points && 0 < a),
            t.forEach(function(e) {
                e.type === enums.Currency.COINS ? o.enableCoinPurchase(0 < n && e.amount >= n) : e.type === enums.Currency.POINTS && o.enablePointsPurchase(0 < a && e.amount >= a)
            })),
        o.addTarget(this, this._ePackEventHandler, enums.UIPackEvent.OPEN),
        o.addTarget(this, this._ePackEventHandler, enums.UIPackEvent.BUY_COINS),
        o.addTarget(this, this._ePackEventHandler, enums.UIPackEvent.BUY_POINTS),
        o.addTarget(this, this._ePackEventHandler, enums.UIPackEvent.CHECK_ODDS),
        this.addSubview(o, this.__itemList),
        this._storePacks.push(o)
    }
}

if(typeof components !== 'undefined'){
    components.ItemFUTBase.prototype.render = function render(e) {
        if(this.getRootElement().parentNode)
            this.getRootElement().parentNode.setAttribute("id", e.resourceId.toString())
        var t = services.Configuration.getItemRarity(e, e.getYear());
        this._rendered && this._resetRender(),
        this._canvas && (this._canvas.clearCanvas(),
            this.removeClass(components.ItemFUTBase.CLASS.LOADED),
            this.addClass(components.ItemFUTBase.CLASS.LOADING)),
        this.assets = {},
        this._assetsLoaded = {},
        this._renderShell(e, t),
        this._render(e, t),
        this.renderAuctionState(e.getAuctionData()),
        this._rendered = !0;
        var i = this._infoStateViewModel && this._canShowSecondaryViews ? this._infoStateViewModel.getState() : enums.UIItemInfoState.MAIN;
        this.setItemInfoState(i)
    }

    components.ListRowItem.prototype.render = function render() {
        utils.Debug.Assert(utils.JS.isValid(this.data), "Missing item data in list row component.");
        var e = this.getData()
        , t = utils.JS.isValid(this._itemComponent);
        t && this._itemComponent.canRender(e) || (t && this._itemComponent.destroy(),
            this._itemComponent = factories.ItemView.createSmallItem(e),
            this._itemComponent.init(),
            this.__entityContainer.insertBefore(this._itemComponent.getRootElement(), this.__entityContainer.firstChild)),
        this.renderItemData(),
        this._itemComponent.render(e),
        this.renderName(),
        utils.JS.isValid(this._dataComponent) && this._viewDirty && (this._dataComponent.destroy(),
            this._dataComponent = null),
        utils.JS.isValid(this._dataComponent) ? this._updateDataComponent(this._dataComponent, this.data, this.comparisonData, this.slotData) : this.setDataComponent(this._generateDataComponent(this.data, this.comparisonData, this.slotData)),
        utils.JS.isValid(this._activeTagComponent) || this.setActiveTagComponent(this._generateActiveTagComponent(this.data)),
        utils.JS.isValid(this.slotData) && !this.slotData.isValid() && this.data.isPlayer() && (this.__name.textContent = enums.Localization.BLANK_STR),
        utils.JS.isValid(this._dataComponent) && (this.__entityContainer.appendChild(this._dataComponent.getRootElement()),
            this._dataComponent.render(e)),
        utils.JS.isValid(this._activeTagComponent) && (this.addClass(enums.UIListRowState.IS_ACTIVE_SQUAD),
            this.__rowContent.appendChild(this._activeTagComponent.getRootElement()),
            this._activeTagComponent.render(e)),
        this._highlightUnassignedBought();
        if(this.data.resourceId == 0){
            this.__root.style.display = "none";
        }
        this._viewDirty = !1,
        this.onTimedUpdate()
    }
}
if(typeof UTSBCChallengeTileView !== 'undefined'){
    UTSBCChallengeTileView.prototype.render = function render() {
        if (utils.JS.isValid(this._data)) {
            var e = this._data.isInProgress()
            , t = this._data.isCompleted();
            this.__root.id = this._data.id,
            this.toggleClass("complete", t),
            this.toggleClass("in-progress", e),
            this._challengeImage.setResource(utils.AssetLocator.getSBCImageURI(utils.AssetLocator.IMAGE_TYPE_SBC_CHALLENGES, enums.Year.ASSET, this._data.assetId), !0).observe(this, function onResourceLoaded(e, t, i, s) {
                e.unobserve(this),
                t || this._challengeImage.setLocalResource("images/sbc/sbcDefaultChallengeTile.png")
            }),
            this._data.hasNotStarted() ? this.__subTitle.textContent = services.Localization.localize("sbc.challenge.status.notStarted") : e ? this.__subTitle.textContent = services.Localization.localize("sbc.challenge.status.inProgress") : t && (this.__subTitle.textContent = services.Localization.localize("sbc.challenge.status.complete"))
        }
    }
}
if(typeof UTSBCChallengesView !== 'undefined'){
    UTSBCChallengesView.prototype.setSBCSet = function setSBCSet(e) {
        this.__root.id = e.id,
        this._setInfo.setProgress(e.challengesCompletedCount, e.challengesCount),
        this._setInfo.setRewards(e.awards),
        this._setInfo.setRepeatableState(e.repeatable),
        this._setInfo.setEndTime(e.endTime || 0),
        this._setInfo.setExpiryState(!e.notExpirable),
        this._setInfo.setFavoriteState(e),
        this.clearChallenges(),
        e.challenges.forEach(this._generateChallengeTile, this),
        this.layoutSubviews()
    }
}