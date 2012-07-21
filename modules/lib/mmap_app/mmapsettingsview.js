$(function(){
  window.MMapSettingsView = Backbone.View.extend({
    template: _.template($('#mapsettingsviewtemplate').html()),

    initialize: function () {
      this.providerModel = this.options.providerModel;
      this.mapModel      = this.options.mapModel;

      $('#mapsettingsview').replaceWith(this.render().el);
      this.setupProviderDropdown();
      this.setupZoomSlider();
    },

    setupProviderDropdown: function () {
      var input_el = $('#mapproviderpicker');
      var self = this;
      _.each( this.providerModel.providers, function (provider, name) {
        input_el.append('<option value="' + name + '">' +
                        provider.description + '</option>'); 
      });
      input_el.change(function() {
        var newprovider = input_el.val();
        self.providerModel.set('provider', newprovider);
      });
    },
  
    setupZoomSlider: function () {
      var self = this;
      this.zoomSlider_el = $('#mapzoom');
      this.zoomSlider_el.val(this.mapModel.get('zoom'));
      this.zoomSlider_el.change(function() {
        self.mapModel.set('zoom', self.zoomSlider_el.val());
      });
    },
    render: function () {
      this.$el.html(this.template({}));
      return this;
    }
  });
});
